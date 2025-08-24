#region using

using User.Domain.Abstractions;

#endregion

namespace User.Domain.Events;

public sealed record class UserCreatedDomainEvent(
    Guid Id,
    string? KeycloakUserNo,
    string UserName,
    string FirstName, 
    string LastName, 
    string? PhoneNumber,
    string Email,
    string? Password) : IDomainEvent;