#region using

using BuildingBlocks.Abstractions.ValueObjects;
using Common.Constants;
using EventSourcing.Events.Orders;
using Inventory.Application.CQRS.InventoryReservation.Commands;
using Inventory.Application.Dtos.InventoryReservations;
using Inventory.Application.Services;
using MassTransit;
using MediatR;

#endregion

namespace Inventory.Worker.Consumer.EventHandlers.Integrations;

public sealed class OrderCreatedIntegrationEventHandler(
    ISender sender,
    ILogger<OrderCreatedIntegrationEventHandler> logger,
    ICatalogGrpcService catalogGrpc)
    : IConsumer<OrderCreatedIntegrationEvent>
{
    #region Methods

    public async Task Consume(ConsumeContext<OrderCreatedIntegrationEvent> context)
    {
        logger.LogInformation("Integration Event handled: {IntegrationEvent}", context.Message.GetType().Name);

        var message = context.Message;

        try
        {
            // Get product information from Catalog service
            var productIds = message.OrderItems.Select(i => i.ProductId.ToString()).ToArray();
            var products = await catalogGrpc.GetProductsAsync(ids: productIds, cancellationToken: context.CancellationToken)
                ?? throw new Exception("Products not found");

            // Reserve inventory for each basket item
            foreach (var basketItem in message.OrderItems)
            {
                var product = products.Items!.FirstOrDefault(p => p.Id == basketItem.ProductId)
                    ?? throw new Exception($"ProductId {basketItem.ProductId} not found");

                var reservationDto = new CreateReservationDto
                {
                    ProductId = product.Id,
                    ProductName = product.Name,
                    ReferenceId = message.OrderId,
                    Quantity = basketItem.Quantity,
                    ExpiresAt = DateTimeOffset.UtcNow.AddMinutes(30) // 30 minutes to complete order
                };

                // ReserveInventoryCommand will automatically find the inventory item with the highest quantity
                var reserveCommand = new ReserveInventoryCommand(reservationDto, Actor.Consumer(AppConstants.Service.Inventory));
                await sender.Send(reserveCommand, context.CancellationToken);

                logger.LogInformation(
                    "Reserved {Quantity} units of product {ProductId} ({ProductName}) for basket {OrderId}",
                    basketItem.Quantity, basketItem.ProductId, product.Name, message.OrderId);
            }

            logger.LogInformation("Successfully reserved inventory for all items in basket {OrderId}", message.OrderId);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Unexpected error while reserving inventory for basket {OrderId}", message.OrderId);

            // TODO: Publish InventoryReservationFailedIntegrationEvent
            // This should trigger order creation failure notification to user
        }
    }

    #endregion
}
