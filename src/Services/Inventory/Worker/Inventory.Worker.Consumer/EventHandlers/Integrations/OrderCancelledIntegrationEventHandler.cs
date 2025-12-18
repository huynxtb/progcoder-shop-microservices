#region using

using BuildingBlocks.Abstractions.ValueObjects;
using Common.Constants;
using EventSourcing.Events.Orders;
using Inventory.Application.CQRS.InventoryReservation.Commands;
using MassTransit;
using MediatR;

#endregion

namespace Inventory.Worker.Consumer.EventHandlers.Integrations;

public sealed class OrderCancelledIntegrationEventHandler(
    ISender sender,
    ILogger<OrderCancelledIntegrationEventHandler> logger)
    : IConsumer<OrderCancelledIntegrationEvent>
{
    #region Methods

    public async Task Consume(ConsumeContext<OrderCancelledIntegrationEvent> context)
    {
        logger.LogInformation("Integration Event handled: {IntegrationEvent}", context.Message.GetType().Name);

        var message = context.Message;

        try
        {
            // Release all pending reservations for this order
            var releaseCommand = new ReleaseReservationCommand(
                message.OrderId,
                message.Reason!,
                Actor.Consumer(AppConstants.Service.Order));

            await sender.Send(releaseCommand, context.CancellationToken);

            logger.LogInformation(
                "Successfully released reservations for cancelled order {OrderNo} (ID: {OrderId}). Reason: {Reason}",
                message.OrderNo, message.OrderId, message.Reason);
        }
        catch (Exception ex)
        {
            logger.LogError(ex,
                "Failed to release reservations for cancelled order {OrderNo} (ID: {OrderId})",
                message.OrderNo, message.OrderId);
        }
    }

    #endregion
}

