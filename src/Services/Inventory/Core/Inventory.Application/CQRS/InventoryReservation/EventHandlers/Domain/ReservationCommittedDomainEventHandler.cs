#region using

using Inventory.Application.Data;
using Inventory.Domain.Entities;
using Inventory.Domain.Events;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

#endregion

namespace Inventory.Application.CQRS.InventoryReservation.EventHandlers.Domain;

public sealed class ReservationCommittedDomainEventHandler(
    IApplicationDbContext dbContext,
    ILogger<ReservationCommittedDomainEventHandler> logger) : INotificationHandler<ReservationCommittedDomainEvent>
{
    #region Implementations

    public async Task Handle(ReservationCommittedDomainEvent @event, CancellationToken cancellationToken)
    {
        logger.LogInformation("Domain Event handled: {DomainEvent}", @event.GetType().Name);

        await CommitInventoryReservationAsync(@event, cancellationToken);
        await LogHistoryAsync(@event, cancellationToken);
    }

    #endregion

    #region Methods

    private async Task CommitInventoryReservationAsync(ReservationCommittedDomainEvent @event, CancellationToken cancellationToken)
    {
        // Find the inventory item by ProductId and LocationId
        var inventoryItem = await dbContext.InventoryItems
            .FirstOrDefaultAsync(x => x.Product.Id == @event.ProductId && x.LocationId == @event.LocationId,
                cancellationToken);

        if (inventoryItem == null)
        {
            logger.LogWarning("Inventory item not found for ProductId: {ProductId}, LocationId: {LocationId}",
                @event.ProductId, @event.LocationId);
            return;
        }

        // Commit the reservation
        inventoryItem.CommitReservation(@event.Quantity, "System");
        dbContext.InventoryItems.Update(inventoryItem);
    }

    private async Task LogHistoryAsync(ReservationCommittedDomainEvent @event, CancellationToken cancellationToken)
    {
        var message = $"Reservation committed: {@event.Quantity} units of {@event.ProductName} for order {@event.ReferenceId}";

        var history = InventoryHistoryEntity.Create(
            id: Guid.NewGuid(),
            message: message,
            performBy: "System");

        await dbContext.InventoryHistories.AddAsync(history, cancellationToken);
    }

    #endregion
}

