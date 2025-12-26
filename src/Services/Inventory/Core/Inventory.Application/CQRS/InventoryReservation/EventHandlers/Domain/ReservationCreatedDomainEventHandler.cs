#region using

using EventSourcing.Events.Inventories;
using Inventory.Application.Data;
using Inventory.Domain.Entities;
using Inventory.Domain.Events;
using MediatR;
using Microsoft.EntityFrameworkCore;
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

        await ReserveInventoryAsync(@event, cancellationToken);
    }

    #endregion

    #region Methods

    private async Task ReserveInventoryAsync(ReservationCreatedDomainEvent @event, CancellationToken cancellationToken)
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

        // Reserve the inventory
        inventoryItem.Reserve((int)@event.Quantity, @event.ReservationId, "System");
        dbContext.InventoryItems.Update(inventoryItem);
    }

    #endregion
}

