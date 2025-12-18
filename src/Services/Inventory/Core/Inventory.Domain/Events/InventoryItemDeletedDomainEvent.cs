#region using

using Inventory.Domain.Abstractions;
using Inventory.Domain.Entities;

#endregion

namespace Inventory.Domain.Events;

public sealed record class InventoryItemDeletedDomainEvent(InventoryItemEntity Inventory) : IDomainEvent;

