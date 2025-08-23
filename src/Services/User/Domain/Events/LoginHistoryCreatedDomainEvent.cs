#region using

using User.Domain.Abstractions;
using User.Domain.Entities;

#endregion

namespace User.Domain.Events;

public sealed record LoginHistoryCreatedDomainEvent(LoginHistoryEntity LoginHistory) : IDomainEvent;