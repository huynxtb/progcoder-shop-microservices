#region using

using Domain.Entities;

#endregion

namespace Domain.Events;

public sealed record class UserEmailVerifiedDomainEvent(User User);