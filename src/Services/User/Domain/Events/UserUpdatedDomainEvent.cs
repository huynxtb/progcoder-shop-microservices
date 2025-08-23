#region using

using User.Domain.Abstractions;

#endregion

namespace User.Domain.Events;

public sealed record class UserUpdatedDomainEvent(Entities.UserEntity User) : IDomainEvent;