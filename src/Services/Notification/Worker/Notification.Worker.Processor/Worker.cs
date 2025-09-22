#region using

using Notification.Application.Data.Repositories;
using Notification.Application.Models;
using Notification.Application.Resolvers;
using Notification.Domain.Enums;
using Common.Configurations;
using Common.Constants;
using BuildingBlocks.Abstractions.ValueObjects;

#endregion

namespace Notification.Worker;

public sealed class Worker(
    IQueryDeliveryRepository delivQueryRepo,
    ICommandDeliveryRepository delivCommandRepo,
    INotificationChannelResolver resolver,
    IConfiguration cfg,
    ILogger<Worker> logger) : BackgroundService
{
    private const int OutboxProcessorFrequency = 1;

    #region Overide Methods

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            var now = DateTimeOffset.UtcNow;
            var batchSize = cfg.GetValue<int>($"{WorkerCfg.Section}:{WorkerCfg.BatchSize}", 100);
            var dueDiliveries = await delivQueryRepo.GetDueAsync(now, batchSize, stoppingToken);

            foreach (var doc in dueDiliveries)
            {
                try
                {
                    if (doc.Payload == null || doc.Payload.To == null)
                    {
                        logger.LogWarning("DeliveryId={DeliveryId} has null payload, marking as Illegal", doc.Id);
                        doc.UpdateStatus(DeliveryStatus.Illegal, Actor.Worker("notification").ToString());
                        await delivCommandRepo.UpsertAsync(doc, stoppingToken);
                        continue;
                    }

                    doc.UpdateStatus(DeliveryStatus.Sending, Actor.Worker("notification").ToString());
                    await delivCommandRepo.UpsertAsync(doc, stoppingToken);

                    var ctx = new NotificationContext
                    {
                        To = doc.Payload.To,
                        Cc = doc.Payload.Cc ?? [],
                        Bcc = doc.Payload.Bcc ?? [],
                        Subject = doc.Payload.Subject,
                        Body = doc.Payload.Body,
                        IsHtml = doc.Payload.IsHtml
                    };

                    var result = await resolver.Resolve(doc.Payload!.Channel).SendAsync(ctx, stoppingToken);

                    doc.IncreaseAttemptCount();

                    if (result.IsSuccess)
                    {
                        doc.UpdateStatus(DeliveryStatus.Sent, Actor.Worker("notification").ToString());
                    }
                    else
                    {
                        doc.RaiseError(result.ErrorMessage!, now);
                        logger.LogWarning("DeliveryId={DeliveryId} failed: {Error}", doc.Id, result.ErrorMessage);
                    }

                    await delivCommandRepo.UpsertAsync(doc, stoppingToken);
                }
                catch (Exception ex)
                {
                    doc.RaiseError(ex.Message!, now);
                    await delivCommandRepo.UpsertAsync(doc, stoppingToken);
                    logger.LogError(ex, "Unhandled error occurred in Worker loop");
                }
            }

            await Task.Delay(TimeSpan.FromSeconds(OutboxProcessorFrequency), stoppingToken);
        }
    }

    #endregion
}
