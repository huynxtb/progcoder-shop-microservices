#region using

using BuildingBlocks.Abstractions.ValueObjects;
using Common.Constants;
using EventSourcing.Events.Orders;
using Inventory.Application.Features.InventoryReservation.Commands;
using MassTransit;
using MediatR;

#endregion

namespace Inventory.Worker.Consumer.EventHandlers.Integrations;

public sealed class OrderDeliveredIntegrationEventHandler(
    ISender sender,
    ILogger<OrderDeliveredIntegrationEventHandler> logger)
    : IConsumer<OrderDeliveredIntegrationEvent>
{
    #region Methods

    public async Task Consume(ConsumeContext<OrderDeliveredIntegrationEvent> context)
    {
        logger.LogInformation("Integration Event handled: {IntegrationEvent}", context.Message.GetType().Name);

        var message = context.Message;

        try
        {
            // Commit all pending/reserved inventory for this order
            // This will decrease both Reserved and Quantity permanently
            var commitCommand = new CommitReservationCommand(
                message.OrderId,
                Actor.Consumer(AppConstants.Service.Order));

            await sender.Send(commitCommand, context.CancellationToken);

            logger.LogInformation(
                "Successfully committed inventory reservations for delivered order {OrderNo} (ID: {OrderId})",
                message.OrderNo, message.OrderId);

            // Log details of committed items
            foreach (var item in message.OrderItems)
            {
                logger.LogInformation(
                    "Committed {Quantity} units of product {ProductId} ({ProductName}) for order {OrderNo}",
                    item.Quantity, item.ProductId, item.ProductName, message.OrderNo);
            }
        }
        catch (Exception ex)
        {
            logger.LogError(ex,
                "Failed to commit reservations for delivered order {OrderNo} (ID: {OrderId})",
                message.OrderNo, message.OrderId);
        }
    }

    #endregion
}
