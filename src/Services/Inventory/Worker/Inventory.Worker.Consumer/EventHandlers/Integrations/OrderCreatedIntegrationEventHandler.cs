#region using

using BuildingBlocks.Abstractions.ValueObjects;
using Common.Configurations;
using Common.Constants;
using EventSourcing.Events.Orders;
using Inventory.Application.Features.InventoryReservation.Commands;
using Inventory.Application.Data;
using Inventory.Application.Dtos.InventoryReservations;
using Inventory.Application.Services;
using MassTransit;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

#endregion

namespace Inventory.Worker.Consumer.EventHandlers.Integrations;

public sealed class OrderCreatedIntegrationEventHandler(
    ISender sender,
    IApplicationDbContext dbContext,
    ILogger<OrderCreatedIntegrationEventHandler> logger,
    ICatalogGrpcService catalogGrpc,
    IConfiguration configuration)
    : IConsumer<OrderCreatedIntegrationEvent>
{
    #region Methods

    public async Task Consume(ConsumeContext<OrderCreatedIntegrationEvent> context)
    {
        var message = context.Message;
        
        logger.LogInformation(
            "Integration Event handled: {IntegrationEvent}, EventId: {EventId}, IntegrationEventId: {IntegrationEventId}, OrderId: {OrderId}, OrderNo: {OrderNo}",
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

                // Idempotency check: Check if reservation already exists for this ReferenceId + ProductId + Pending status
                var existingReservation = await dbContext.InventoryReservations
                    .FirstOrDefaultAsync(
                        x => x.ReferenceId == message.OrderId
                            && x.Product.Id == product.Id,
                        context.CancellationToken);

                if (existingReservation != null) return;

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
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Unexpected error while reserving inventory for order {OrderId}", message.OrderId);

            // TODO: Publish InventoryReservationFailedIntegrationEvent
            // This should trigger order creation failure notification to user
        }
    }

    #endregion
}
