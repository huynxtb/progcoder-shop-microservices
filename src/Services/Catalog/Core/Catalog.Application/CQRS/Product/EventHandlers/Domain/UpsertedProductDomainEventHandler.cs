#region using

using Catalog.Domain.Entities;
using Catalog.Domain.Events;
using EventSourcing.Events.Catalog;
using Marten;
using MediatR;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

#endregion

namespace Catalog.Application.CQRS.Product.EventHandlers.Domain;

public sealed class UpsertedProductDomainEventHandler(
    IDocumentSession session,
    ILogger<UpsertedProductDomainEventHandler> logger) : INotificationHandler<UpsertedProductDomainEvent>
{
    #region Implementations

    public async Task Handle(UpsertedProductDomainEvent @event, CancellationToken cancellationToken)
    {
        logger.LogInformation("Domain Event handled: {DomainEvent}", @event.GetType().Name);

        await PushToOutboxAsync(@event, cancellationToken);
    }

    #endregion

    #region Methods

    private async Task PushToOutboxAsync(UpsertedProductDomainEvent @event, CancellationToken cancellationToken)
    {
        var message = new UpsertedProductIntegrationEvent
        {
            ProductId = @event.Id,
            Name = @event.Name,
            Sku = @event.Sku,
            Slug = @event.Slug,
            Price = @event.Price,
            SalesPrice = @event.SalesPrice,
            Categories = @event.Categories,
            Images = @event.Images,
            Thumbnail = @event.Thumbnail,
            Status = (int)@event.Status,
            CreatedOnUtc = @event.CreatedOnUtc,
            CreatedBy = @event.CreatedBy,
            LastModifiedOnUtc = @event.LastModifiedOnUtc,
            LastModifiedBy = @event.LastModifiedBy
        };

        var outboxMessage = OutboxMessageEntity.Create(
            id: Guid.NewGuid(),
            eventType: message.EventType!,
            content: JsonConvert.SerializeObject(message),
            occurredOnUtc: DateTimeOffset.UtcNow);

        session.Store(outboxMessage);
    }

    #endregion
}