#region using

using Inventory.Domain.Abstractions;

#endregion

namespace Inventory.Domain.Events;

public sealed record ReservationReleasedDomainEvent(
    Guid ReservationId,
    Guid ProductId,
    string ProductName,
    Guid ReferenceId,
    Guid LocationId,
    int Quantity,
    string Reason) : IDomainEvent;

