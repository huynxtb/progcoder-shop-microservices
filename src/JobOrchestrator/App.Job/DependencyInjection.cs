#region using

using App.Job.ApiClients;
using App.Job.Quartz;
using BuildingBlocks.Logging;
using Common.Configurations;
using Quartz;
using Refit;

#endregion

namespace App.Job;

public static class DependencyInjection
{
    #region Methods

    public static IServiceCollection AddWorkerServices(
        this IServiceCollection services,
        IConfiguration cfg)
    {
        services.AddSerilogLogging(cfg);

        services.AddQuartz(q =>
        {
            q.UseInMemoryStore();
            q.UseDefaultThreadPool(tp =>
            {
                tp.MaxConcurrency = 10;
            });

            q.UseJobFactory<QuartzJobFactory>();
        });

        services.AddQuartzHostedService(q => q.WaitForJobsToComplete = true);
        services.AddQuartzJobs();
        services.AddRefitClients(cfg);

        return services;
    }

    public static async Task RegisterJobsAsync(
        this IServiceProvider serviceProvider,
        CancellationToken cancellationToken = default)
    {
        var scheduler = await serviceProvider.GetRequiredService<ISchedulerFactory>().GetScheduler(cancellationToken);
        var loggerFactory = serviceProvider.GetRequiredService<ILoggerFactory>();
        var logger = loggerFactory.CreateLogger("App.Job");

        await scheduler.RegisterJobsToScheduler(logger, cancellationToken);
    }

    #endregion

    #region Private Methods

    private static IServiceCollection AddRefitClients(this IServiceCollection services, IConfiguration cfg)
    {
        services.AddRefitClient<IKeycloakApi>()
                .ConfigureHttpClient(c =>
                {
                    c.BaseAddress = new Uri(cfg[$"{KeycloakApiCfg.Section}:{KeycloakApiCfg.BaseUrl}"]!);
                    c.Timeout = TimeSpan.FromSeconds(30);
                });

        return services;
    }

    #endregion
}
