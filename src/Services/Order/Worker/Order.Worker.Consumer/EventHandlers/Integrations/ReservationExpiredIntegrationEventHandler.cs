#region using

using EventSourcing.Events.Inventories;
using MassTransit;

#endregion

namespace Order.Worker.Consumer.EventHandlers.Integrations;

public sealed class ReservationExpiredIntegrationEventHandler(
    ILogger<ReservationExpiredIntegrationEventHandler> logger)
    : IConsumer<ReservationExpiredIntegrationEvent>
{
    #region Methods

    public async Task Consume(ConsumeContext<ReservationExpiredIntegrationEvent> context)
    {
        logger.LogInformation("Integration Event handled: {IntegrationEvent}", context.Message.GetType().Name);

        var message = context.Message;

        // TODO: Cancel the order if it's still pending payment
        // Update order status to "Cancelled" with reason "Reservation Expired"
        
        logger.LogWarning("Reservation expired for order {OrderId}: Reservation {ReservationId}, Product {ProductId}",
            message.ReferenceId, message.ReservationId, message.ProductId);

        await Task.CompletedTask;
    }

    #endregion
}

