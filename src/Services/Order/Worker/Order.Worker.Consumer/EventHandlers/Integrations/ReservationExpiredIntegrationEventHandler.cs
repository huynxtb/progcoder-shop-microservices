#region using

using Common.ValueObjects;
using Common.Constants;
using EventSourcing.Events.Inventories;
using MassTransit;
using MediatR;
using Order.Application.Features.Order.Commands;
using Order.Domain.Enums;
using Order.Domain.Abstractions;
using Order.Domain.Entities;
using System.Text.Json;

#endregion

namespace Order.Worker.Consumer.EventHandlers.Integrations;

public sealed class ReservationExpiredIntegrationEventHandler(
    ISender sender,
    IUnitOfWork unitOfWork,
    ILogger<ReservationExpiredIntegrationEventHandler> logger)
    : IConsumer<ReservationExpiredIntegrationEvent>
{
    #region Methods

    public async Task Consume(ConsumeContext<ReservationExpiredIntegrationEvent> context)
    {
        var message = context.Message;
        var messageId = context.MessageId ?? Guid.NewGuid();

        // Check if message already exists in inbox (idempotency)
        var existingMessage = await unitOfWork.InboxMessages
            .FirstOrDefaultAsync(m => m.Id == messageId, context.CancellationToken);

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
            // Process the event
            var command = new UpdateOrderStatusCommand(
                OrderId: message.OrderId,
                Status: OrderStatus.Canceled,
                Reason: "Order automatically cancelled due to expired inventory reservation",
                Actor: Actor.Consumer(AppConstants.Service.Order));

            await sender.Send(command, context.CancellationToken);

            // Mark as successfully processed
            inboxMessage.CompleteProcessing(DateTimeOffset.UtcNow);
            await unitOfWork.SaveChangesAsync(context.CancellationToken);

            logger.LogInformation(
                "Successfully cancelled order {OrderId} due to expired reservation {ReservationId} for product {ProductId}",
                message.OrderId, message.ReservationId, message.ProductId);
        }
        catch (Exception ex)
        {
            logger.LogError(ex,
                "Failed to cancel order {OrderId} due to expired reservation {ReservationId}",
                message.OrderId, message.ReservationId);

            // Mark as failed
            inboxMessage.CompleteProcessing(DateTimeOffset.UtcNow, ex.Message);
            await unitOfWork.SaveChangesAsync(context.CancellationToken);

            throw;
        }
    }

    #endregion
}

