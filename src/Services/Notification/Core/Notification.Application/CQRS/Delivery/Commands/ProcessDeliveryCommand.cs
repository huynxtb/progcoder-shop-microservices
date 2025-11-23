#region using

using Notification.Application.Data.Repositories;
using Notification.Application.Models;
using Notification.Domain.Enums;
using BuildingBlocks.Abstractions.ValueObjects;
using Common.Constants;
using Microsoft.Extensions.Logging;
using Notification.Application.Strategy;

#endregion

namespace Notification.Application.CQRS.Delivery.Commands;

public sealed record ProcessDeliveryCommand(Guid DeliveryId, Actor Actor) : ICommand<bool>;

public sealed class ProcessDeliveryCommandValidator : AbstractValidator<ProcessDeliveryCommand>
{
    #region Ctors

    public ProcessDeliveryCommandValidator()
    {
        RuleFor(x => x.DeliveryId)
            .NotEmpty()
            .WithMessage(MessageCode.IdIsRequired);
    }

    #endregion
}

public sealed class ProcessDeliveryCommandHandler(
    IQueryDeliveryRepository deliveryQueryRepo,
    ICommandDeliveryRepository deliveryCommandRepo,
    INotificationSenderResolver resolver,
    ILogger<ProcessDeliveryCommandHandler> logger)
    : ICommandHandler<ProcessDeliveryCommand, bool>
{
    #region Implementations

    public async Task<bool> Handle(ProcessDeliveryCommand command, CancellationToken cancellationToken)
    {
        var delivery = await deliveryQueryRepo.GetByIdAsync(command.DeliveryId, cancellationToken);
        
        if (delivery == null)
        {
            logger.LogWarning("Delivery not found: {DeliveryId}", command.DeliveryId);
            return false;
        }

        try
        {
            // Check if payload is valid
            if (delivery.Payload == null || delivery.Payload.To == null)
            {
                logger.LogWarning("DeliveryId={DeliveryId} has null payload, marking as Illegal", delivery.Id);
                delivery.UpdateStatus(DeliveryStatus.Illegal, command.Actor.ToString());
                await deliveryCommandRepo.UpsertAsync(delivery, cancellationToken);
                return false;
            }

            // Update status to Sending
            delivery.UpdateStatus(DeliveryStatus.Sending, command.Actor.ToString());
            await deliveryCommandRepo.UpsertAsync(delivery, cancellationToken);

            // Create notification context
            var ctx = new NotificationContext
            {
                To = delivery.Payload.To,
                Cc = delivery.Payload.Cc ?? [],
                Bcc = delivery.Payload.Bcc ?? [],
                Subject = delivery.Payload.Subject,
                Body = delivery.Payload.Body,
                IsHtml = delivery.Payload.IsHtml
            };

            // Send notification
            var result = await resolver.Resolve(delivery.Payload!.Channel).SendAsync(ctx, cancellationToken);

            // Increase attempt count
            delivery.IncreaseAttemptCount();

            var now = DateTimeOffset.UtcNow;

            // Update status based on result
            if (result.IsSuccess)
            {
                delivery.UpdateStatus(DeliveryStatus.Sent, command.Actor.ToString());
                logger.LogInformation("DeliveryId={DeliveryId} sent successfully", delivery.Id);
            }
            else
            {
                delivery.RaiseError(result.ErrorMessage!, now);
                logger.LogWarning("DeliveryId={DeliveryId} failed: {Error}", delivery.Id, result.ErrorMessage);
            }

            // Save delivery
            await deliveryCommandRepo.UpsertAsync(delivery, cancellationToken);

            return result.IsSuccess;
        }
        catch (Exception ex)
        {
            var now = DateTimeOffset.UtcNow;
            delivery.RaiseError(ex.Message, now);
            await deliveryCommandRepo.UpsertAsync(delivery, cancellationToken);
            logger.LogError(ex, "Unhandled error occurred while processing DeliveryId={DeliveryId}", delivery.Id);
            return false;
        }
    }

    #endregion
}

