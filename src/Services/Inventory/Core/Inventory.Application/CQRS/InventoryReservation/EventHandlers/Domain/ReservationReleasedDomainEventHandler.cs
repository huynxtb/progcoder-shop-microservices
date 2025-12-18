#region using

using Inventory.Application.Data;
using Inventory.Domain.Entities;
using Inventory.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;

#endregion

namespace Inventory.Application.CQRS.InventoryReservation.EventHandlers.Domain;

public sealed class ReservationReleasedDomainEventHandler(
    IApplicationDbContext dbContext,
    ILogger<ReservationReleasedDomainEventHandler> logger) : INotificationHandler<ReservationReleasedDomainEvent>
{
    #region Implementations

    public async Task Handle(ReservationReleasedDomainEvent @event, CancellationToken cancellationToken)
    {
        logger.LogInformation("Domain Event handled: {DomainEvent}", @event.GetType().Name);

        await LogHistoryAsync(@event, cancellationToken);
    }

    #endregion

    #region Methods

    private async Task LogHistoryAsync(ReservationReleasedDomainEvent @event, CancellationToken cancellationToken)
    {
        var message = $"Reservation released: {@event.Quantity} units of {@event.ProductName} for order {@event.ReferenceId}. Reason: {@event.Reason}";

        var history = InventoryHistoryEntity.Create(
            id: Guid.NewGuid(),
            message: message,
            performBy: "System");

        await dbContext.InventoryHistories.AddAsync(history, cancellationToken);
    }

    #endregion
}

