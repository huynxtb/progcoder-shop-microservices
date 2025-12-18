#region using

using EventSourcing.Events.Inventories;
using Inventory.Application.Data;
using Inventory.Domain.Entities;
using Inventory.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

#endregion

namespace Inventory.Application.CQRS.InventoryReservation.EventHandlers.Domain;

public sealed class ReservationCreatedDomainEventHandler(
    IApplicationDbContext dbContext,
    ILogger<ReservationCreatedDomainEventHandler> logger) : INotificationHandler<ReservationCreatedDomainEvent>
{
    #region Implementations

    public async Task Handle(ReservationCreatedDomainEvent @event, CancellationToken cancellationToken)
    {
        logger.LogInformation("Domain Event handled: {DomainEvent}", @event.GetType().Name);

        await PushToOutboxAsync(@event, cancellationToken);
    }

    #endregion

    #region Methods

    private async Task PushToOutboxAsync(ReservationCreatedDomainEvent @event, CancellationToken cancellationToken)
    {
        var message = new InventoryReservedIntegrationEvent
        {
            ReservationId = @event.ReservationId,
            ProductId = @event.ProductId,
            ProductName = @event.ProductName,
            ReferenceId = @event.ReferenceId,
            Quantity = (int)@event.Quantity,
            ExpiresAt = @event.ExpiresAt
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

