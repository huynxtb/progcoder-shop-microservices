#region using

using BuildingBlocks.Abstractions.ValueObjects;
using Common.Constants;
using EventSourcing.Events.Orders;
using Inventory.Application.Features.InventoryReservation.Commands;
using Inventory.Domain.Abstractions;
using Inventory.Domain.Repositories;
using Inventory.Domain.Entities;
using MassTransit;
using MediatR;
using System.Text.Json;

#endregion

namespace Inventory.Worker.Consumer.EventHandlers.Integrations;

public sealed class OrderDeliveredIntegrationEventHandler(
    ISender sender,
    IUnitOfWork unitOfWork,
    ILogger<OrderDeliveredIntegrationEventHandler> logger)
    : IConsumer<OrderDeliveredIntegrationEvent>
{
    #region Methods

    public async Task Consume(ConsumeContext<OrderDeliveredIntegrationEvent> context)
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
            var commitCommand = new CommitReservationCommand(
                message.OrderId,
                Actor.Consumer(AppConstants.Service.Order));

            await sender.Send(commitCommand, context.CancellationToken);

            logger.LogInformation(
                "Successfully committed inventory reservations for delivered order {OrderNo} (ID: {OrderId})",
                message.OrderNo, message.OrderId);

            foreach (var item in message.OrderItems)
            {
                logger.LogInformation(
                    "Committed {Quantity} units of product {ProductId} ({ProductName}) for order {OrderNo}",
                    item.Quantity, item.ProductId, item.ProductName, message.OrderNo);
            }

            inboxMessage.CompleteProcessing(DateTimeOffset.UtcNow);
            await unitOfWork.SaveChangesAsync(context.CancellationToken);
        }
        catch (Exception ex)
        {
            logger.LogError(ex,
                "Failed to commit reservations for delivered order {OrderNo} (ID: {OrderId})",
                message.OrderNo, message.OrderId);
            
            inboxMessage.CompleteProcessing(DateTimeOffset.UtcNow, ex.Message);
            await unitOfWork.SaveChangesAsync(context.CancellationToken);
            
            throw;
        }
    }

    #endregion
}

