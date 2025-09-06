#region using

using Order.Domain.Abstractions;

#endregion

namespace Order.Domain.Events;

public sealed record class ReservedDomainEvent(
    Guid Id,
    Guid ProductId,
    Guid ReservationId,
    int Amount) : IDomainEvent;