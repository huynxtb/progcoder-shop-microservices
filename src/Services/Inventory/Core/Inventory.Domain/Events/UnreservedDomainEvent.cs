#region using

using Inventory.Domain.Abstractions;

#endregion

namespace Inventory.Domain.Events;

public sealed record UnreservedDomainEvent(
    Guid Id,
    Guid ProductId,
    Guid ReservationId,
    int Amount) : IDomainEvent;