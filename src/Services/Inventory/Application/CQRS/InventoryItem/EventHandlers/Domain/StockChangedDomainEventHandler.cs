#region using

using Inventory.Application.Data;
using Inventory.Domain.Entities;
using Inventory.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;

#endregion

namespace Inventory.Application.CQRS.Inventory.EventHandlers.Domain;

public sealed class UserCreatedDomainEventHandler(
    IApplicationDbContext dbContext,
    ILogger<UserCreatedDomainEventHandler> logger) : INotificationHandler<StockChangedDomainEvent>
{
    #region Implementations

    public async Task Handle(StockChangedDomainEvent @event, CancellationToken cancellationToken)
    {
        logger.LogInformation("Domain Event handled: {DomainEvent}", @event.GetType().Name);

        var history = InventoryHistoryEntity.Create(id: Guid.NewGuid(),
            inventoryItemId: @event.Id,
            changedAt: DateTimeOffset.UtcNow,
            changeAmount: @event.ChangeAmount,
            quantityAfterChange: @event.QuantityAfterChange,
            source: @event.Source);

        await dbContext.InventoryHistories.AddAsync(history, cancellationToken);
    }

    #endregion
}