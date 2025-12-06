#region using

using Quartz;

#endregion

namespace App.Job.Quartz;

public class QuartzHostedService(IScheduler scheduler, ILogger<QuartzHostedService> logger) : IHostedService
{
    #region Implementations

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        logger.LogInformation("Starting Quartz Scheduler...");
        await scheduler.Start(cancellationToken);
        logger.LogInformation("Quartz Scheduler started successfully");
    }

    public async Task StopAsync(CancellationToken cancellationToken)
    {
        logger.LogInformation("Stopping Quartz Scheduler...");
        await scheduler.Shutdown(true, cancellationToken);
        logger.LogInformation("Quartz Scheduler stopped");
    }

    #endregion
}
