#region using

using BuildingBlocks.Abstractions.ValueObjects;
using Common.Constants;
using EventSourcing.Events.Inventories;
using MassTransit;
using MediatR;
using Order.Application.Features.Order.Commands;
using Order.Domain.Enums;

#endregion

namespace Order.Worker.Consumer.EventHandlers.Integrations;

public sealed class ReservationExpiredIntegrationEventHandler(
    ISender sender,
    ILogger<ReservationExpiredIntegrationEventHandler> logger)
    : IConsumer<ReservationExpiredIntegrationEvent>
{
    #region Methods

    public async Task Consume(ConsumeContext<ReservationExpiredIntegrationEvent> context)
    {
        logger.LogInformation("Integration Event handled: {IntegrationEvent}", context.Message.GetType().Name);

        var message = context.Message;

        try
        {
            var command = new UpdateOrderStatusCommand(
                OrderId: message.OrderId,
                Status: OrderStatus.Canceled,
                Reason: "Order automatically cancelled due to expired inventory reservation",
                Actor: Actor.Consumer(AppConstants.Service.Order));

            await sender.Send(command, context.CancellationToken);

            logger.LogInformation(
                "Successfully cancelled order {OrderId} due to expired reservation {ReservationId} for product {ProductId}",
                message.OrderId, message.ReservationId, message.ProductId);
        }
        catch (Exception ex)
        {
            logger.LogError(ex,
                "Failed to cancel order {OrderId} due to expired reservation {ReservationId}",
                message.OrderId, message.ReservationId);
            throw;
        }
    }

    #endregion
}

