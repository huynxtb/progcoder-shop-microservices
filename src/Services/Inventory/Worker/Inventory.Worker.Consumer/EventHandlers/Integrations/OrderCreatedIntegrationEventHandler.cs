#region using

using BuildingBlocks.Abstractions.ValueObjects;
using Common.Configurations;
using Common.Constants;
using EventSourcing.Events.Orders;
using Inventory.Application.Features.InventoryReservation.Commands;
using Inventory.Application.Dtos.InventoryReservations;
using Inventory.Application.Services;
using Inventory.Domain.Abstractions;
using Inventory.Domain.Repositories;
using Inventory.Domain.Entities;
using MassTransit;
using MediatR;
using Microsoft.Extensions.Configuration;
using System.Text.Json;

#endregion

namespace Inventory.Worker.Consumer.EventHandlers.Integrations;

public sealed class OrderCreatedIntegrationEventHandler(
    ISender sender,
    IUnitOfWork unitOfWork,
    ILogger<OrderCreatedIntegrationEventHandler> logger,
    ICatalogGrpcService catalogGrpc,
    IConfiguration configuration)
    : IConsumer<OrderCreatedIntegrationEvent>
{
    #region Methods

    public async Task Consume(ConsumeContext<OrderCreatedIntegrationEvent> context)
    {
        var message = context.Message;
        var messageId = Guid.Parse(message.Id);

        // Use execution strategy for retry logic
        await using var transaction = await unitOfWork.BeginTransactionAsync(context.CancellationToken);

        try
        {
            // Check if message already exists in inbox (idempotency)
            var existingMessage = await unitOfWork.InboxMessages
                .GetByMessageIdAsync(messageId, context.CancellationToken);

            if (existingMessage != null)
            {
                logger.LogInformation("Message {MessageId} already processed. Skipping.", messageId);
                await transaction.RollbackAsync(context.CancellationToken);
                return;
            }

            // Create inbox record to track this event
            var inboxMessage = InboxMessageEntity.Create(
                messageId,
                message.GetType().AssemblyQualifiedName!,
                JsonSerializer.Serialize(message),
                DateTimeOffset.UtcNow);

            await unitOfWork.InboxMessages.AddAsync(inboxMessage, context.CancellationToken);
            await unitOfWork.SaveChangesAsync(context.CancellationToken);

            // Commit transaction to lock this message ID
            await transaction.CommitAsync(context.CancellationToken);

            logger.LogInformation(
                "Processing integration event: {IntegrationEvent}, EventId: {EventId}, IntegrationEventId: {IntegrationEventId}, OrderId: {OrderId}, OrderNo: {OrderNo}",
                context.Message.GetType().Name,
                context.MessageId,
                message.Id,
                message.OrderId,
                message.OrderNo);

            try
            {
                // Get product information from Catalog service
                var productIds = message.OrderItems.Select(i => i.ProductId.ToString()).ToArray();
                var products = await catalogGrpc.GetProductsAsync(ids: productIds, cancellationToken: context.CancellationToken)
                    ?? throw new Exception("Products not found");

                // Reserve inventory for each order item
                foreach (var orderItem in message.OrderItems)
                {
                    var product = products.Items!.FirstOrDefault(p => p.Id == orderItem.ProductId)
                        ?? throw new Exception($"ProductId {orderItem.ProductId} not found");

                    // Check if reservation already exists for this ReferenceId + ProductId
                    var existingReservation = await unitOfWork.InventoryReservations
                        .GetByOrderAndProductAsync(message.OrderId, product.Id, context.CancellationToken);

                    if (existingReservation != null)
                    {
                        logger.LogInformation(
                            "Reservation already exists for OrderId {OrderId}, ProductId {ProductId}. Skipping this item.",
                            message.OrderId, product.Id);
                        continue; // Skip this item, process next
                    }

                    var expirationMinutes = configuration.GetValue<int>($"{AppConfigCfg.Section}:{AppConfigCfg.ReservationExpirationMinutes}");

                    var reservationDto = new CreateReservationDto
                    {
                        ProductId = product.Id,
                        ProductName = product.Name,
                        ReferenceId = message.OrderId,
                        Quantity = orderItem.Quantity,
                        ExpiresAt = DateTimeOffset.UtcNow.AddMinutes(expirationMinutes)
                    };

                    // ReserveInventoryCommand will automatically find the inventory item with the highest quantity
                    var reserveCommand = new ReserveInventoryCommand(reservationDto, Actor.Consumer(AppConstants.Service.Inventory));
                    await sender.Send(reserveCommand, context.CancellationToken);

                    logger.LogInformation(
                        "Reserved {Quantity} units of product {ProductId} ({ProductName}) for order {OrderId}",
                        orderItem.Quantity, orderItem.ProductId, product.Name, message.OrderId);
                }

                logger.LogInformation("Successfully reserved inventory for all items in order {OrderId}", message.OrderId);

                // Mark as successfully processed
                inboxMessage.CompleteProcessing(DateTimeOffset.UtcNow);
                await unitOfWork.SaveChangesAsync(context.CancellationToken);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Unexpected error while reserving inventory for order {OrderId}", message.OrderId);

                // Mark as failed
                inboxMessage.CompleteProcessing(DateTimeOffset.UtcNow, ex.Message);
                await unitOfWork.SaveChangesAsync(context.CancellationToken);

                // TODO: Publish InventoryReservationFailedIntegrationEvent
                // This should trigger order creation failure notification to user

                throw;
            }
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error processing message {MessageId}", messageId);
            await transaction.RollbackAsync(context.CancellationToken);
            throw;
        }
    }

    #endregion
}

