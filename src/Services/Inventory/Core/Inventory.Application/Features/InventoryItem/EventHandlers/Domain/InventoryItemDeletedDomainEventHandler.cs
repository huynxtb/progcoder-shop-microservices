#region using

using EventSourcing.Events.Inventories;
using Inventory.Domain.Abstractions;using Inventory.Domain.Repositories;
using Inventory.Domain.Entities;
using Inventory.Domain.Enums;
using Inventory.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

#endregion

namespace Inventory.Application.Features.InventoryItem.EventHandlers.Domain;

public sealed class InventoryItemDeletedDomainEventHandler(
    IUnitOfWork unitOfWork,
    ILogger<InventoryItemDeletedDomainEventHandler> logger) : INotificationHandler<InventoryItemDeletedDomainEvent>
{
    #region Implementations

    public async Task Handle(InventoryItemDeletedDomainEvent @event, CancellationToken cancellationToken)
    {
        logger.LogInformation("Domain Event handled: {DomainEvent}", @event.GetType().Name);

        await PushToOutboxAsync(@event, cancellationToken);
        await LogHistoryAsync(@event, cancellationToken);
    }

    #endregion

    #region Methods

    private async Task PushToOutboxAsync(InventoryItemDeletedDomainEvent @event, CancellationToken cancellationToken)
    {
        var message = new StockChangedIntegrationEvent()
        {
            Id = Guid.NewGuid().ToString(),
            InventoryItemId = @event.Inventory.Id,
            ProductId = @event.Inventory.Product.Id,
            ChangeType = (int)InventoryChangeType.Decrease,
            Amount = 0,
            Source = InventorySource.ManualDelete.GetDescription()
        };
        var outboxMessage = OutboxMessageEntity.Create(
            id: Guid.NewGuid(),
            eventType: message.EventType!,
            content: JsonConvert.SerializeObject(message),
            occurredOnUtc: DateTimeOffset.UtcNow);

        await unitOfWork.OutboxMessages.AddAsync(outboxMessage, cancellationToken);
    }

    private async Task LogHistoryAsync(InventoryItemDeletedDomainEvent @event, CancellationToken cancellationToken)
    {
        var history = InventoryHistoryEntity.Create(id: Guid.NewGuid(),
            message: $"Product {@event.Inventory.Product.Name} has been deleted from warehouse",
            performBy: Actor.System(AppConstants.Service.Inventory).ToString());

        await unitOfWork.InventoryHistories.AddAsync(history, cancellationToken);
    }

    #endregion
}