#region using

using Inventory.Domain.Abstractions;
using Inventory.Domain.Enums;

#endregion

namespace Inventory.Domain.Events;

public sealed record class StockChangedDomainEvent(
    Guid Id,
    Guid ProductId,
    int Amount,
    InventoryChangeType ChangeType,
    string Source) : IDomainEvent;