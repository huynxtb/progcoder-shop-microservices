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

public sealed class ReservationExpiredDomainEventHandler(
    IApplicationDbContext dbContext,
    ILogger<ReservationExpiredDomainEventHandler> logger) : INotificationHandler<ReservationExpiredDomainEvent>
{
    #region Implementations

    public async Task Handle(ReservationExpiredDomainEvent @event, CancellationToken cancellationToken)
    {
        logger.LogInformation("Domain Event handled: {DomainEvent}", @event.GetType().Name);

        await PushToOutboxAsync(@event, cancellationToken);
        await LogHistoryAsync(@event, cancellationToken);
    }

    #endregion

    #region Methods

    private async Task PushToOutboxAsync(ReservationExpiredDomainEvent @event, CancellationToken cancellationToken)
    {
        var message = new ReservationExpiredIntegrationEvent
        {
            ReservationId = @event.ReservationId,
            ProductId = @event.ProductId,
            ProductName = @event.ProductName,
            ReferenceId = @event.ReferenceId,
            Quantity = @event.Quantity
        };

        var outboxMessage = OutboxMessageEntity.Create(
            id: Guid.NewGuid(),
            eventType: message.EventType!,
            content: JsonConvert.SerializeObject(message),
            occurredOnUtc: DateTimeOffset.UtcNow);

        await dbContext.OutboxMessages.AddAsync(outboxMessage, cancellationToken);
    }

    private async Task LogHistoryAsync(ReservationExpiredDomainEvent @event, CancellationToken cancellationToken)
    {
        var message = $"Reservation expired: {@event.Quantity} units of {@event.ProductName} for order {@event.ReferenceId}";

        var history = InventoryHistoryEntity.Create(
            id: Guid.NewGuid(),
            message: message,
            performBy: "System");

        await dbContext.InventoryHistories.AddAsync(history, cancellationToken);
    }

    #endregion
}

