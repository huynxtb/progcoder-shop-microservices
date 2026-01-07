#region using

using EventSourcing.Events.Inventories;
using Inventory.Domain.Abstractions;using Inventory.Domain.Repositories;
using Inventory.Domain.Entities;
using Inventory.Domain.Events;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

#endregion

namespace Inventory.Application.Features.InventoryReservation.EventHandlers.Domain;

public sealed class ReservationExpiredDomainEventHandler(
    IUnitOfWork unitOfWork,
    ILogger<ReservationExpiredDomainEventHandler> logger) : INotificationHandler<ReservationExpiredDomainEvent>
{
    #region Implementations

    public async Task Handle(ReservationExpiredDomainEvent @event, CancellationToken cancellationToken)
    {
        logger.LogInformation("Domain Event handled: {DomainEvent}", @event.GetType().Name);

        await LogHistoryAsync(@event, cancellationToken);
        await PushToOutboxAsync(@event, cancellationToken);
    }

    #endregion

    #region Methods

    private async Task LogHistoryAsync(ReservationExpiredDomainEvent @event, CancellationToken cancellationToken)
    {
        var message = $"Reservation expired: {@event.Quantity} units of {@event.ProductName} for order {@event.ReferenceId}";

        var history = InventoryHistoryEntity.Create(
            id: Guid.NewGuid(),
            message: message,
            performBy: Actor.System(AppConstants.Service.Inventory).ToString());

        await unitOfWork.InventoryHistories.AddAsync(history, cancellationToken);
    }

    private async Task PushToOutboxAsync(ReservationExpiredDomainEvent @event, CancellationToken cancellationToken)
    {
        var message = new ReservationExpiredIntegrationEvent
        {
            Id = Guid.NewGuid().ToString(),
            ReservationId = @event.ReservationId,
            OrderId = @event.ReferenceId,
            ProductId = @event.ProductId,
            ProductName = @event.ProductName,
            Quantity = @event.Quantity
        };

        var outboxMessage = OutboxMessageEntity.Create(
            id: Guid.NewGuid(),
            eventType: message.EventType!,
            content: JsonConvert.SerializeObject(message),
            occurredOnUtc: DateTimeOffset.UtcNow);

        await unitOfWork.OutboxMessages.AddAsync(outboxMessage, cancellationToken);
    }

    #endregion
}

