#region using

using Common.ValueObjects;
using Common.Constants;
using EventSourcing.Events.Orders;
using Inventory.Application.Features.InventoryReservation.Commands;
using Inventory.Domain.Entities;
using MassTransit;
using MediatR;
using System.Text.Json;
using Inventory.Domain.Abstractions;

#endregion

namespace Inventory.Worker.Consumer.EventHandlers.Integrations;

public sealed class OrderCancelledIntegrationEventHandler(
    ISender sender,
    IUnitOfWork unitOfWork,
    ILogger<OrderCancelledIntegrationEventHandler> logger)
    : IConsumer<OrderCancelledIntegrationEvent>
{
    #region Methods

    public async Task Consume(ConsumeContext<OrderCancelledIntegrationEvent> context)
    {
        var message = context.Message;
        var messageId = context.MessageId ?? Guid.NewGuid();

        // Check if message already exists in inbox (idempotency)
        var existingMessage = await unitOfWork.InboxMessages
            .GetByMessageIdAsync(messageId, context.CancellationToken);

        if (existingMessage != null)
        {
            logger.LogInformation("Message {MessageId} already processed. Skipping.", messageId);
            return;
        }

        var inboxMessage = InboxMessageEntity.Create(
            messageId,
            message.GetType().AssemblyQualifiedName!,
            JsonSerializer.Serialize(message),
            DateTimeOffset.UtcNow);

        await unitOfWork.InboxMessages.AddAsync(inboxMessage, context.CancellationToken);
        await unitOfWork.SaveChangesAsync(context.CancellationToken);

        logger.LogInformation("Processing integration event {EventType} with ID {MessageId}",
            message.GetType().Name, messageId);

        try
        {
            var releaseCommand = new ReleaseReservationCommand(
                message.OrderId,
                message.Reason!,
                Actor.Consumer(AppConstants.Service.Order));

            await sender.Send(releaseCommand, context.CancellationToken);

            logger.LogInformation(
                "Successfully released reservations for cancelled order {OrderNo} (ID: {OrderId}). Reason: {Reason}",
                message.OrderNo, message.OrderId, message.Reason);

            inboxMessage.CompleteProcessing(DateTimeOffset.UtcNow);
            await unitOfWork.SaveChangesAsync(context.CancellationToken);
        }
        catch (Exception ex)
        {
            logger.LogError(ex,
                "Failed to release reservations for cancelled order {OrderNo} (ID: {OrderId})",
                message.OrderNo, message.OrderId);

            inboxMessage.CompleteProcessing(DateTimeOffset.UtcNow, ex.Message);
            await unitOfWork.SaveChangesAsync(context.CancellationToken);

            throw;
        }
    }

    #endregion
}


