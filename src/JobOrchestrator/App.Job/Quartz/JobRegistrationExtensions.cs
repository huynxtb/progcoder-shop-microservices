#region using

using App.Job.Attributes;
using Quartz;
using System.Reflection;

#endregion

namespace App.Job.Quartz;

public static class JobRegistrationExtensions
{
    #region Methods

    public static IServiceCollection AddQuartzJobs(this IServiceCollection services)
    {
        var jobTypes = DiscoverJobTypes();

        foreach (var jobType in jobTypes)
        {
            services.AddScoped(jobType);
        }

        return services;
    }

    public static async Task RegisterJobsToScheduler(
        this IScheduler scheduler,
        ILogger logger,
        CancellationToken cancellationToken = default)
    {
        var jobTypes = DiscoverJobTypes();

        foreach (var jobType in jobTypes)
        {
            try
            {
                var jobAttribute = jobType.GetCustomAttribute<JobAttribute>();
                var jobName = jobAttribute?.JobName ?? jobType.Name;
                var jobGroup = jobAttribute?.JobGroup ?? GetJobGroupFromNamespace(jobType.Namespace ?? string.Empty);
                var description = jobAttribute?.Description ?? $"Job: {jobType.Name}";

                // Create JobDetail
                var jobDetail = JobBuilder
                    .Create(jobType)
                    .WithIdentity(jobName, jobGroup)
                    .WithDescription(description)
                    .StoreDurably()
                    .Build();

                // Register job to scheduler
                await scheduler.AddJob(jobDetail, replace: true, cancellationToken: cancellationToken);

                // If cron expression exists and AutoStart is true, create trigger
                if (jobAttribute != null &&
                    !string.IsNullOrWhiteSpace(jobAttribute.CronExpression) &&
                    jobAttribute.AutoStart)
                {
                    var trigger = TriggerBuilder
                        .Create()
                        .WithIdentity($"{jobName}_Trigger", jobGroup)
                        .ForJob(jobName, jobGroup)
                        .WithCronSchedule(jobAttribute.CronExpression)
                        .WithDescription($"Trigger for {jobName}")
                        .Build();

                    await scheduler.ScheduleJob(trigger, cancellationToken);

                    logger.LogInformation(
                        "Registered and scheduled job: {JobName} in group {JobGroup} with cron: {CronExpression}",
                        jobName, jobGroup, jobAttribute.CronExpression);
                }
                else
                {
                    logger.LogInformation(
                        "Registered job (manual trigger): {JobName} in group {JobGroup}",
                        jobName, jobGroup);
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Failed to register job: {JobType}", jobType.Name);
            }
        }
    }

    #endregion

    #region Private Methods

    private static List<Type> DiscoverJobTypes()
    {
        try
        {
            var assembly = Assembly.GetExecutingAssembly();
            return GetJobTypesFromAssembly(assembly);
        }
        catch (Exception)
        {
            return new List<Type>();
        }
    }

    private static List<Type> GetJobTypesFromAssembly(Assembly assembly)
    {
        try
        {
            var types = assembly.GetTypes()
                .Where(t =>
                    !t.IsAbstract &&
                    !t.IsInterface &&
                    typeof(IJob).IsAssignableFrom(t) &&
                    (t.Namespace?.StartsWith("App.Job.Jobs") == true ||
                     t.GetCustomAttribute<JobAttribute>() != null))
                .ToList();

            return types;
        }
        catch (ReflectionTypeLoadException)
        {
            return new List<Type>();
        }
    }

    private static string GetJobGroupFromNamespace(string namespaceName)
    {
        if (string.IsNullOrWhiteSpace(namespaceName))
            return "Default";

        var parts = namespaceName.Split('.');

        // Find "Jobs" and get the next part as group name
        var jobsIndex = Array.IndexOf(parts, "Jobs");
        if (jobsIndex >= 0 && jobsIndex < parts.Length - 1)
        {
            return parts[jobsIndex + 1];
        }

        return "Default";
    }

    #endregion
}
