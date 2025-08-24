#region using

using User.Domain.Abstractions;

#endregion

namespace User.Domain.Events;

public sealed record class UserEmailVerifiedDomainEvent(
    Guid Id,
    string? KeycloakUserNo) : IDomainEvent;