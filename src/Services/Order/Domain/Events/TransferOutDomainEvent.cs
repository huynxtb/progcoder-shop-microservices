#region using

using Order.Domain.Abstractions;

#endregion

namespace Order.Domain.Events;

public sealed record class TransferOutDomainEvent(
    Guid Id,
    Guid ProductId,
    Guid FromLocation,
    Guid ToLocation,
    int Amount,
    string Reference) : IDomainEvent;