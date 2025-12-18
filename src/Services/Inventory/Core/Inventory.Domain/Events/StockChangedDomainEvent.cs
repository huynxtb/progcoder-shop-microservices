#region using

using Inventory.Domain.Abstractions;
using Inventory.Domain.Enums;

#endregion

namespace Inventory.Domain.Events;

public sealed record class StockChangedDomainEvent(
    Guid InventoryItemId,
    Guid ProductId,
    string ProductName,
    int ChangeAmount,
    int OldQuantity,
    int QuantityAfterChange,
    InventoryChangeType ChangeType,
    string Source,
    int Available) : IDomainEvent;