#region using

using EventSourcing.Events.Inventories;
using MassTransit;

#endregion

namespace Order.Worker.Consumer.EventHandlers.Integrations;

public sealed class InventoryReservationFailedIntegrationEventHandler(
    ILogger<InventoryReservationFailedIntegrationEventHandler> logger)
    : IConsumer<InventoryReservationFailedIntegrationEvent>
{
    #region Methods

    public async Task Consume(ConsumeContext<InventoryReservationFailedIntegrationEvent> context)
    {
        logger.LogInformation("Integration Event handled: {IntegrationEvent}", context.Message.GetType().Name);

        var message = context.Message;

        // TODO: Cancel the order due to insufficient inventory
        // Update order status to "Cancelled" with reason "Insufficient Stock"
        
        logger.LogError("Inventory reservation failed for order {OrderId}: Product {ProductId}, Requested {Requested}, Available {Available}, Reason: {Reason}",
            message.ReferenceId, message.ProductId, message.RequestedQuantity, message.AvailableQuantity, message.Reason);

        await Task.CompletedTask;
    }

    #endregion
}

