#region using

using Inventory.Domain.Abstractions;

#endregion

namespace Inventory.Domain.Events;

public sealed record class TransferOutDomainEvent(
    Guid Id,
    Guid ProductId,
    Guid FromLocation,
    Guid ToLocation,
    int Amount,
    string Reference) : IDomainEvent;