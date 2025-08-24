#region using

using User.Domain.Abstractions;

#endregion

namespace User.Domain.Events;

public sealed record class UserUpdatedDomainEvent(
    Guid Id,
    string Email,
    string FirstName,
    string LastName,
    string? PhoneNumber,
    bool Enable) : IDomainEvent;