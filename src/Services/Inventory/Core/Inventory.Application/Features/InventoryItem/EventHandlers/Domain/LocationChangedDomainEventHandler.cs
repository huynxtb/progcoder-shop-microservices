#region using

using Inventory.Application.Data;
using Inventory.Domain.Entities;
using Inventory.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;

#endregion

namespace Inventory.Application.Features.InventoryItem.EventHandlers.Domain;

public sealed class LocationChangedDomainEventHandler(
    IApplicationDbContext dbContext,
    ILogger<LocationChangedDomainEventHandler> logger) : INotificationHandler<LocationChangedDomainEvent>
{
    #region Implementations

    public async Task Handle(LocationChangedDomainEvent @event, CancellationToken cancellationToken)
    {
        logger.LogInformation("Domain Event handled: {DomainEvent}", @event.GetType().Name);

        await LogHistoryAsync(@event, cancellationToken);
    }

    #endregion

    #region Methods

    private async Task LogHistoryAsync(LocationChangedDomainEvent @event, CancellationToken cancellationToken)
    {
        var history = InventoryHistoryEntity.Create(id: Guid.NewGuid(),
            message: $"Product {@event.ProductName} has been moved from warehouse {@event.OldLocation} to warehouse {@event.NewLocation}",
            performBy: Actor.System(AppConstants.Service.Inventory).ToString());

        await dbContext.InventoryHistories.AddAsync(history, cancellationToken);
    }

    #endregion
}

