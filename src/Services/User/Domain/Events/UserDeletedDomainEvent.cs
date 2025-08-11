#region using

using Domain.Abstractions;
using Domain.Entities;

#endregion

namespace Domain.Events;

public sealed record class UserDeletedDomainEvent(User User) : IDomainEvent;