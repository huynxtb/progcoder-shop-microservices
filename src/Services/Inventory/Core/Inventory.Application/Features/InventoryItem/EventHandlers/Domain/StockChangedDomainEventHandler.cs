#region using

using EventSourcing.Events.Inventories;
using Inventory.Domain.Entities;
using Inventory.Domain.Enums;
using Inventory.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Inventory.Domain.Abstractions;

#endregion

namespace Inventory.Application.Features.InventoryItem.EventHandlers.Domain;

public sealed class StockChangedDomainEventHandler(
    IUnitOfWork unitOfWork,
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
            Id = Guid.NewGuid().ToString(),
            InventoryItemId = @event.InventoryItemId,
            ProductId = @event.ProductId,
            ChangeType = (int)@event.ChangeType,
            Amount = @event.Available,
            Source = @event.Source
        };
        var outboxMessage = OutboxMessageEntity.Create(
            id: Guid.NewGuid(),
            eventType: message.EventType!,
            content: JsonConvert.SerializeObject(message),
            occurredOnUtc: DateTimeOffset.UtcNow);

        await unitOfWork.OutboxMessages.AddAsync(outboxMessage, cancellationToken);
    }

    private async Task LogHistoryAsync(StockChangedDomainEvent @event, CancellationToken cancellationToken)
    {
        var message = @event.ChangeType switch
        {
            InventoryChangeType.Init =>
                $"Initialized inventory for product '{@event.ProductName}' with {Math.Abs(@event.ChangeAmount)} units. " +
                $"\nQuantity: {@event.QuantityAfterChange}, Available: {@event.Available}. Source: {@event.Source}",

            InventoryChangeType.Increase =>
                $"Increased {Math.Abs(@event.ChangeAmount)} units of product '{@event.ProductName}'. " +
                $"\nQuantity: {@event.OldQuantity} ? {@event.QuantityAfterChange}, Available: {@event.Available}. Source: {@event.Source}",

            InventoryChangeType.Decrease =>
                $"Decreased {Math.Abs(@event.ChangeAmount)} units of product '{@event.ProductName}'. " +
                $"\nQuantity: {@event.OldQuantity} ? {@event.QuantityAfterChange}, Available: {@event.Available}. Source: {@event.Source}",

            InventoryChangeType.Reserve =>
                $"Reserved {Math.Abs(@event.ChangeAmount)} units of product '{@event.ProductName}'. " +
                $"\nReserved increased, Available decreased: {@event.Available}. Source: {@event.Source}",

            InventoryChangeType.Release =>
                $"Released {Math.Abs(@event.ChangeAmount)} units of product '{@event.ProductName}'. " +
                $"\nReserved decreased, Available increased: {@event.Available}. Source: {@event.Source}",

            InventoryChangeType.Commit =>
                $"Committed {Math.Abs(@event.ChangeAmount)} units of product '{@event.ProductName}'. " +
                $"\nQuantity: {@event.OldQuantity} ? {@event.QuantityAfterChange}, Available: {@event.Available}. Source: {@event.Source}",

            InventoryChangeType.Transfer =>
                $"Transferred {Math.Abs(@event.ChangeAmount)} units of product '{@event.ProductName}'. " +
                $"\nQuantity: {@event.OldQuantity} ? {@event.QuantityAfterChange}, Available: {@event.Available}. Source: {@event.Source}",

            _ =>
                $"Stock changed for product '{@event.ProductName}' by {Math.Abs(@event.ChangeAmount)} units. " +
                $"\nQuantity: {@event.OldQuantity} ? {@event.QuantityAfterChange}, Available: {@event.Available}. Source: {@event.Source}"
        };

        var history = InventoryHistoryEntity.Create(
            id: Guid.NewGuid(),
            message: message,
            performBy: Actor.System(AppConstants.Service.Inventory).ToString());

        await unitOfWork.InventoryHistories.AddAsync(history, cancellationToken);
    }

    #endregion
}