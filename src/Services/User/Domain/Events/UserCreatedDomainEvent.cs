#region using

using User.Domain.Abstractions;

#endregion

namespace User.Domain.Events;

public sealed record class UserCreatedDomainEvent(
    Guid Id,
    string FirstName, 
    string LastName, 
    string Email) : IDomainEvent;