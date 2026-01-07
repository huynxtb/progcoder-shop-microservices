#region using

using EventSourcing.Events.Orders;
using MediatR;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Order.Domain.Abstractions;
using Order.Domain.Entities;
using Order.Domain.Events;

#endregion

namespace Order.Application.Features.Order.EventHandlers.Domain;

public sealed class OrderCreatedDomainEventHandler(
    IUnitOfWork unitOfWork,
    ILogger<OrderCreatedDomainEventHandler> logger) : INotificationHandler<OrderCreatedDomainEvent>
{
    #region Implementations

    public async Task Handle(OrderCreatedDomainEvent @event, CancellationToken cancellationToken)
    {
        logger.LogInformation(
            "Domain Event handled: {DomainEvent} for OrderId: {OrderId}, OrderNo: {OrderNo}",
            @event.GetType().Name, @event.Order.Id, @event.Order.OrderNo);

        await PushToOutboxAsync(@event, cancellationToken);
    }

    #endregion

    #region Methods

    private async Task PushToOutboxAsync(OrderCreatedDomainEvent @event, CancellationToken cancellationToken)
    {
        var message = new OrderCreatedIntegrationEvent()
        {
            Id = Guid.NewGuid().ToString(),
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

        var outboxMessageId = Guid.NewGuid();
        var outboxMessage = OutboxMessageEntity.Create(
            id: outboxMessageId,
            eventType: message.EventType!,
            content: JsonConvert.SerializeObject(message),
            occurredOnUtc: DateTimeOffset.UtcNow);

        await unitOfWork.OutboxMessages.AddAsync(outboxMessage, cancellationToken);

        logger.LogInformation(
            "Created outbox message {OutboxMessageId} for OrderId: {OrderId}, OrderNo: {OrderNo}",
            outboxMessageId, @event.Order.Id, @event.Order.OrderNo);
    }

    #endregion
}