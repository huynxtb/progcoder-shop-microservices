#region using

using Catalog.Domain.Entities;
using Catalog.Domain.Events;
using EventSourcing.Events.Catalog;
using Marten;
using MediatR;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

#endregion

namespace Catalog.Application.Features.Product.EventHandlers.Domain;

public sealed class DeletedUnPublishedProductDomainEventHandler(
    IDocumentSession session,
    ILogger<UpsertedProductDomainEventHandler> logger) : INotificationHandler<DeletedUnPublishedProductDomainEvent>
{
    #region Implementations

    public async Task Handle(DeletedUnPublishedProductDomainEvent @event, CancellationToken cancellationToken)
    {
        logger.LogInformation("Domain Event handled: {DomainEvent}", @event.GetType().Name);

        await PushToOutboxAsync(@event, cancellationToken);
    }

    #endregion

    #region Methods

    private async Task PushToOutboxAsync(DeletedUnPublishedProductDomainEvent @event, CancellationToken cancellationToken)
    {
        var message = new DeletedUnPublishedProductIntegrationEvent
        {
            Id = Guid.NewGuid().ToString(),
            ProductId = @event.ProductId
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