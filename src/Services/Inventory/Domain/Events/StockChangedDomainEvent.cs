#region using

using Inventory.Domain.Abstractions;
using Inventory.Domain.Enums;

#endregion

namespace Inventory.Domain.Events;

public sealed record class StockChangedDomainEvent(
    Guid Id,
    Guid ProductId,
    int ChangeAmount,
    int QuantityAfterChange,
    InventoryChangeType ChangeType,
    string Source) : IDomainEvent;