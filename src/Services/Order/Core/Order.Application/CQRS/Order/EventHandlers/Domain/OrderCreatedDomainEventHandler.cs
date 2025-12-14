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

public sealed class OrderCreatedDomainEventHandler(
    IApplicationDbContext dbContext,
    ILogger<OrderCreatedDomainEventHandler> logger) : INotificationHandler<OrderCreatedDomainEvent>
{
    #region Implementations

    public async Task Handle(OrderCreatedDomainEvent @event, CancellationToken cancellationToken)
    {
        logger.LogInformation("Domain Event handled: {DomainEvent}", @event.GetType().Name);

        await PushToOutboxAsync(@event, cancellationToken);
    }

    #endregion

    #region Methods

    private async Task PushToOutboxAsync(OrderCreatedDomainEvent @event, CancellationToken cancellationToken)
    {
        var message = new OrderCreatedIntegrationEvent()
        {
            OrderId = @event.Order.Id,
            OrderNo = @event.Order.OrderNo.ToString(),
            TotalPrice = @event.Order.TotalPrice,
            FinalPrice = @event.Order.FinalPrice,
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