#region using

using Inventory.Application.Data;
using Inventory.Domain.Entities;
using Inventory.Domain.Events;
using MediatR;
using Microsoft.EntityFrameworkCore;
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

        await ReleaseInventoryReservationAsync(@event, cancellationToken);
        await LogHistoryAsync(@event, cancellationToken);
    }

    #endregion

    #region Methods

    private async Task ReleaseInventoryReservationAsync(ReservationReleasedDomainEvent @event, CancellationToken cancellationToken)
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

        // Release the reservation (unreserve)
        inventoryItem.Unreserve(@event.Quantity, @event.ReservationId, "System");
        dbContext.InventoryItems.Update(inventoryItem);
    }

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

