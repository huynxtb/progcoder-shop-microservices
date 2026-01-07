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

public sealed class ReservationCreatedDomainEventHandler(
    IUnitOfWork unitOfWork,
    ILogger<ReservationCreatedDomainEventHandler> logger) : INotificationHandler<ReservationCreatedDomainEvent>
{
    #region Implementations

    public async Task Handle(ReservationCreatedDomainEvent @event, CancellationToken cancellationToken)
    {
        logger.LogInformation("Domain Event handled: {DomainEvent}", @event.GetType().Name);

        await LogHistoryAsync(@event, cancellationToken);
    }

    #endregion

    #region Methods

    private async Task LogHistoryAsync(ReservationCreatedDomainEvent @event, CancellationToken cancellationToken)
    {
        var message = $"Reservation created: {@event.Quantity} units of {@event.ProductName} reserved for order {@event.ReferenceId}";

        var history = InventoryHistoryEntity.Create(
            id: Guid.NewGuid(),
            message: message,
            performBy: Actor.System(AppConstants.Service.Inventory).ToString());

        await unitOfWork.InventoryHistories.AddAsync(history, cancellationToken);
    }

    #endregion
}

