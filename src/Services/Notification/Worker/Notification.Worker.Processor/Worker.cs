#region using

using Notification.Application.CQRS.Delivery.Commands;
using Notification.Application.CQRS.Delivery.Queries;
using Common.Configurations;
using Common.Constants;
using BuildingBlocks.Abstractions.ValueObjects;
using MediatR;

#endregion

namespace Notification.Worker.Processor;

public sealed class Worker(
    ISender sender,
    IConfiguration cfg,
    ILogger<Worker> logger) : BackgroundService
{
    private const int ProcessorFrequency = 1;

    #region Overide Methods

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            var now = DateTimeOffset.UtcNow;
            var batchSize = cfg.GetValue<int>($"{WorkerCfg.Proccessor.Section}:{WorkerCfg.Proccessor.BatchSize}", 100);
            var dueDiliveries = await sender.Send(new GetDueDeliveriesQuery(now, batchSize), stoppingToken);

            foreach (var doc in dueDiliveries)
            {
                try
                {
                    var actor = Actor.Worker("notification");
                    await sender.Send(new ProcessDeliveryCommand(doc.Id, actor), stoppingToken);
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, "Unhandled error occurred while processing DeliveryId={DeliveryId}", doc.Id);
                }
            }

            await Task.Delay(TimeSpan.FromSeconds(ProcessorFrequency), stoppingToken);
        }
    }

    #endregion
}
