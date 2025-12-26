#region using

using BuildingBlocks.Abstractions.ValueObjects;
using Inventory.Application.Data;
using Inventory.Domain.Entities;
using Inventory.Domain.Events;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

#endregion

namespace Inventory.Application.CQRS.InventoryItem.EventHandlers.Domain;

public sealed class ReservedDomainEventHandler(
    IApplicationDbContext dbContext,
    ILogger<ReservedDomainEventHandler> logger) : INotificationHandler<ReservedDomainEvent>
{
    #region Implementations

    public async Task Handle(ReservedDomainEvent @event, CancellationToken cancellationToken)
    {
        logger.LogInformation("Domain Event handled: {DomainEvent}", @event.GetType().Name);

        await LogHistoryAsync(@event, cancellationToken);
    }

    #endregion

    #region Methods

    private async Task LogHistoryAsync(ReservedDomainEvent @event, CancellationToken cancellationToken)
    {
        var inventoryItem = await dbContext.InventoryItems
            .Include(x => x.Location)
            .FirstOrDefaultAsync(x => x.Id == @event.Id, cancellationToken);

        if (inventoryItem == null)
        {
            logger.LogWarning("Inventory item {InventoryItemId} not found for ReservedDomainEvent", @event.Id);
            return;
        }

        var message = $"Reserved {-@event.Amount} units of product '{inventoryItem.Product.Name}' " +
                      $"at location '{inventoryItem.Location.Location}' for reservation {{{@event.ReservationId}}}. " +
                      $"\nAvailable: {inventoryItem.Available}." +
                      $"\nReserved: {inventoryItem.Reserved}";

        var history = InventoryHistoryEntity.Create(
            id: Guid.NewGuid(),
            message: message,
            performBy: Actor.System(AppConstants.Service.Inventory).ToString());

        await dbContext.InventoryHistories.AddAsync(history, cancellationToken);
    }

    #endregion
}
