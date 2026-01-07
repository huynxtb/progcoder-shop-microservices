#region using

using Inventory.Domain.Entities;
using Inventory.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;
using Inventory.Domain.Abstractions;

#endregion

namespace Inventory.Application.Features.InventoryReservation.EventHandlers.Domain;

public sealed class ReservationReleasedDomainEventHandler(
    IUnitOfWork unitOfWork,
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
            performBy: Actor.System(AppConstants.Service.Inventory).ToString());

        await unitOfWork.InventoryHistories.AddAsync(history, cancellationToken);
    }

    #endregion
}

