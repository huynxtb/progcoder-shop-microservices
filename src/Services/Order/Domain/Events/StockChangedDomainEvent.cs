#region using

using Order.Domain.Abstractions;
using Order.Domain.Enums;

#endregion

namespace Order.Domain.Events;

public sealed record class StockChangedDomainEvent(
    Guid InventoryItemId,
    Guid ProductId,
    int ChangeAmount,
    int QuantityAfterChange,
    InventoryChangeType ChangeType,
    string Source) : IDomainEvent;