#region using

using EventSourcing.Events.Inventories;
using MassTransit;

#endregion

namespace Order.Worker.Consumer.EventHandlers.Integrations;

public sealed class InventoryReservedIntegrationEventHandler(
    ILogger<InventoryReservedIntegrationEventHandler> logger)
    : IConsumer<InventoryReservedIntegrationEvent>
{
    #region Methods

    public async Task Consume(ConsumeContext<InventoryReservedIntegrationEvent> context)
    {
        logger.LogInformation("Integration Event handled: {IntegrationEvent}", context.Message.GetType().Name);

        var message = context.Message;

        // TODO: Update order status to "Confirmed" or "InventoryReserved"
        // This indicates that inventory has been successfully reserved for the order
        
        logger.LogInformation("Inventory reserved for order {OrderId}: Reservation {ReservationId}, Product {ProductId}, Quantity {Quantity}",
            message.ReferenceId, message.ReservationId, message.ProductId, message.Quantity);

        await Task.CompletedTask;
    }

    #endregion
}

