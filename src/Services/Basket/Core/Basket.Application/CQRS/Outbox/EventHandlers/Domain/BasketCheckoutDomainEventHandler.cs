#region using

using Basket.Application.Repositories;
using Basket.Domain.Entities;
using Basket.Domain.Events;
using EventSourcing.Events.Baskets;
using MediatR;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

#endregion

namespace Basket.Application.CQRS.Outbox.EventHandlers.Domain;

public sealed class BasketCheckoutDomainEventHandler(
    IOutboxRepository outboxRepo,
    ILogger<BasketCheckoutDomainEventHandler> logger) : INotificationHandler<BasketCheckoutDomainEvent>
{
    #region Implementations

    public async Task Handle(BasketCheckoutDomainEvent @event, CancellationToken cancellationToken)
    {
        logger.LogInformation("Domain Event handled: {DomainEvent}", @event.GetType().Name);

        await PushToOutboxAsync(@event, cancellationToken);
    }

    #endregion

    #region Methods

    private async Task PushToOutboxAsync(BasketCheckoutDomainEvent @event, CancellationToken cancellationToken)
    {
        var message = new BasketCheckoutIntegrationEvent
        {
            BasketId = @event.Basket.Id,
            TotalPrice = @event.Basket.TotalPrice,
            Customer = @event.Adapt<BasketCheckoutCustomerIntegrationEvent>(),
            ShippingAddress = @event.Adapt<BasketCheckoutAddressIntegrationEvent>(),
            Items = @event.Basket.Items.Adapt<List<BasketCheckoutItemIntegrationEvent>>()
        };

        var outboxMessage = OutboxMessageEntity.Create(
            id: Guid.NewGuid(),
            eventType: message.EventType!,
            content: JsonConvert.SerializeObject(message),
            occurredOnUtc: DateTimeOffset.Now);

        await outboxRepo.AddMessageAsync(outboxMessage, cancellationToken);
    }

    #endregion
}