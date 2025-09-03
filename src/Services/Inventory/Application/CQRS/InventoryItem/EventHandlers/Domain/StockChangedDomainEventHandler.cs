#region using

using BuildingBlocks.Abstractions.ValueObjects;
using EventSourcing.Events.Inventories;
using Inventory.Application.Data;
using Inventory.Application.Dtos.InventoryItems;
using Inventory.Domain.Entities;
using Inventory.Domain.Enums;
using Inventory.Domain.Events;
using MassTransit;
using MediatR;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Threading;

#endregion

namespace Inventory.Application.CQRS.InventoryItem.EventHandlers.Domain;

public sealed class StockChangedDomainEventHandler(
    IApplicationDbContext dbContext,
    ILogger<StockChangedDomainEventHandler> logger) : INotificationHandler<StockChangedDomainEvent>
{
    #region Implementations

    public async Task Handle(StockChangedDomainEvent @event, CancellationToken cancellationToken)
    {
        logger.LogInformation("Domain Event handled: {DomainEvent}", @event.GetType().Name);

        await PushToOutboxAsync(@event, cancellationToken);
        await LogHistoryAsync(@event, cancellationToken);
    }

    #endregion

    #region Methods

    private async Task PushToOutboxAsync(StockChangedDomainEvent @event, CancellationToken cancellationToken)
    {
        var message = new StockChangedIntegrationEvent()
        {
            InventoryItemId = @event.InventoryItemId,
            ProductId = @event.ProductId,
            ChangeType = (int)@event.ChangeType,
            Amount = @event.QuantityAfterChange,
            Source = InventorySource.ManualAdjustment.GetDescription()
        };
        var outboxMessage = OutboxMessageEntity.Create(
            id: Guid.NewGuid(),
            eventType: message.EventType!,
            content: JsonConvert.SerializeObject(message),
            occurredOnUtc: DateTimeOffset.UtcNow);

        await dbContext.OutboxMessages.AddAsync(outboxMessage, cancellationToken);
    }

    private async Task LogHistoryAsync(StockChangedDomainEvent @event, CancellationToken cancellationToken)
    {
        var history = InventoryHistoryEntity.Create(id: Guid.NewGuid(),
            inventoryItemId: @event.InventoryItemId,
            changedAt: DateTimeOffset.UtcNow,
            changeAmount: @event.ChangeAmount,
            quantityAfterChange: @event.QuantityAfterChange,
            source: @event.Source);

        await dbContext.InventoryHistories.AddAsync(history, cancellationToken);
    }

    #endregion
}