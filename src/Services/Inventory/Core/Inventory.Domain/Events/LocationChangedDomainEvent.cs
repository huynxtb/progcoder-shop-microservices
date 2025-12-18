#region using

using Inventory.Domain.Abstractions;

#endregion

namespace Inventory.Domain.Events;

public sealed record class LocationChangedDomainEvent(
    Guid InventoryItemId,
    Guid ProductId,
    string ProductName,
    string OldLocation,
    string NewLocation) : IDomainEvent;

