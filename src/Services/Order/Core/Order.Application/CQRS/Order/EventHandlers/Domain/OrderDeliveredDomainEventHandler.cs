#region using

using EventSourcing.Events.Orders;
using MediatR;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Order.Application.Data;
using Order.Domain.Entities;
using Order.Domain.Events;

#endregion

namespace Order.Application.CQRS.Order.EventHandlers.Domain;

public sealed class OrderDeliveredDomainEventHandler(
    IApplicationDbContext dbContext,
    ILogger<OrderDeliveredDomainEventHandler> logger) : INotificationHandler<OrderDeliveredDomainEvent>
{
    #region Implementations

    public async Task Handle(OrderDeliveredDomainEvent @event, CancellationToken cancellationToken)
    {
        logger.LogInformation("Domain Event handled: {DomainEvent}", @event.GetType().Name);

        await PushToOutboxAsync(@event, cancellationToken);
    }

    #endregion

    #region Methods

    private async Task PushToOutboxAsync(OrderDeliveredDomainEvent @event, CancellationToken cancellationToken)
    {
        var reason = string.IsNullOrEmpty(@event.Order.RefundReason) ? @event.Order.CancelReason : @event.Order.RefundReason;
        var message = new OrderDeliveredIntegrationEvent()
        {
            OrderId = @event.Order.Id,
            OrderNo = @event.Order.OrderNo.ToString(),
            Reason = reason!,
            OrderItems = @event.Order.OrderItems.Select(oi => new OrderItemIntegrationEvent
            {
                ProductId = oi.Product.Id,
                Quantity = oi.Quantity,
                UnitPrice = oi.Product.Price,
                LineTotal = oi.LineTotal
            }).ToList(),
        };
        var outboxMessage = OutboxMessageEntity.Create(
            id: Guid.NewGuid(),
            eventType: message.EventType!,
            content: JsonConvert.SerializeObject(message),
            occurredOnUtc: DateTimeOffset.UtcNow);

        await dbContext.OutboxMessages.AddAsync(outboxMessage, cancellationToken);
    }

    #endregion
}