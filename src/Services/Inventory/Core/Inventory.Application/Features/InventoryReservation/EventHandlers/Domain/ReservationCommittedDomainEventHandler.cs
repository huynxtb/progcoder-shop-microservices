#region using

using Inventory.Domain.Entities;
using Inventory.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;
using Inventory.Domain.Abstractions;

#endregion

namespace Inventory.Application.Features.InventoryReservation.EventHandlers.Domain;

public sealed class ReservationCommittedDomainEventHandler(
    IUnitOfWork unitOfWork,
    ILogger<ReservationCommittedDomainEventHandler> logger) : INotificationHandler<ReservationCommittedDomainEvent>
{
    #region Implementations

    public async Task Handle(ReservationCommittedDomainEvent @event, CancellationToken cancellationToken)
    {
        logger.LogInformation("Domain Event handled: {DomainEvent}", @event.GetType().Name);

        await LogHistoryAsync(@event, cancellationToken);
    }

    #endregion

    #region Methods

    private async Task LogHistoryAsync(ReservationCommittedDomainEvent @event, CancellationToken cancellationToken)
    {
        var message = $"Reservation committed: {@event.Quantity} units of {@event.ProductName} for order {@event.ReferenceId}";

        var history = InventoryHistoryEntity.Create(
            id: Guid.NewGuid(),
            message: message,
            performBy: Actor.System(AppConstants.Service.Inventory).ToString());

        await unitOfWork.InventoryHistories.AddAsync(history, cancellationToken);
    }

    #endregion
}

