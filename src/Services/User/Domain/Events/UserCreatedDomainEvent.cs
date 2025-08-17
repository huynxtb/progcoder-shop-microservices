#region using

using User.Domain.Abstractions;

#endregion

namespace User.Domain.Events;

public sealed record class UserCreatedDomainEvent(Entities.User User) : IDomainEvent;