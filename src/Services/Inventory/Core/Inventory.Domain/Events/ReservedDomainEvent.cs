#region using

using Inventory.Domain.Abstractions;

#endregion

namespace Inventory.Domain.Events;

public sealed record class ReservedDomainEvent(
    Guid Id,
    Guid ProductId,
    Guid ReservationId,
    int Amount) : IDomainEvent;