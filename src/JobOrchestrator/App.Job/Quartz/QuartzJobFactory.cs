#region using

using Quartz;
using Quartz.Spi;
using System.Collections.Concurrent;

#endregion

namespace App.Job.Quartz;

public class QuartzJobFactory : IJobFactory
{
    #region Fields, Properties and Indexers

    private readonly IServiceScopeFactory _serviceScopeFactory;

    private readonly ConcurrentDictionary<IJob, IServiceScope> _jobScopes = new();

    #endregion

    #region Ctors

    public QuartzJobFactory(IServiceScopeFactory serviceScopeFactory)
    {
        _serviceScopeFactory = serviceScopeFactory;
    }


    #endregion

    #region Implementations

    public IJob NewJob(TriggerFiredBundle bundle, IScheduler scheduler)
    {
        var jobDetail = bundle.JobDetail;
        var jobType = jobDetail.JobType;
        var scope = _serviceScopeFactory.CreateScope();

        try
        {
            var job = scope.ServiceProvider.GetService(jobType) as IJob;

            if (job == null)
            {
                scope.Dispose();
                throw new InvalidOperationException($"Unable to create job of type {jobType.Name}");
            }

            _jobScopes[job] = scope;

            return job;
        }
        catch
        {
            scope.Dispose();
            throw;
        }
    }

    public void ReturnJob(IJob job)
    {
        if (_jobScopes.TryRemove(job, out var scope))
        {
            scope.Dispose();
        }

        if (job is IDisposable disposable)
        {
            disposable.Dispose();
        }
    }

    #endregion
}
