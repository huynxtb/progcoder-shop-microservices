#region using

using App.Job.Attributes;
using Inventory.Grpc;
using Quartz;

#endregion

namespace App.Job.Jobs.Inventory;

[Job(
    JobName = "ExpireInventoryReservations",
    JobGroup = "Inventory",
    Description = "Expires pending inventory reservations that have exceeded their expiration time",
    CronExpression = "0 0/5 * * * ?", // Runs every 5 minutes
    AutoStart = true)]
public class ExpireInventoryReservationsJob(
    ILogger<ExpireInventoryReservationsJob> logger,
    InventoryGrpc.InventoryGrpcClient inventoryGrpc) : IJob
{
    #region Implementations

    public async Task Execute(IJobExecutionContext context)
    {
        var jobKey = context.JobDetail.Key;

        logger.LogInformation(
            "Job {JobName} started at {StartTime}",
            jobKey.Name,
            DateTimeOffset.Now);

        try
        {
            await ExpireReservationsAsync(context.CancellationToken);

            logger.LogInformation(
                "Job {JobName} completed successfully at {EndTime}",
                jobKey.Name,
                DateTimeOffset.Now);
        }
        catch (OperationCanceledException)
        {
            logger.LogWarning("Job {JobName} was cancelled", jobKey.Name);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Job {JobName} failed with error", jobKey.Name);
        }
    }

    #endregion

    #region Private Methods

    private async Task ExpireReservationsAsync(CancellationToken cancellationToken)
    {
        logger.LogInformation("Checking for expired inventory reservations...");

        var response = await inventoryGrpc.ExpireReservationAsync(
            new ExpireReservationRequest { },
            cancellationToken: cancellationToken);

        logger.LogInformation("Expire reservations result: {Result}", response.Success);
    }

    #endregion
}

