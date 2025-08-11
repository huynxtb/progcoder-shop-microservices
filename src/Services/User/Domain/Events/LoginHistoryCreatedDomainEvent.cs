#region using

using Domain.Abstractions;
using Domain.Entities;

#endregion

namespace Domain.Events;

public sealed record LoginHistoryCreatedDomainEvent(LoginHistory LoginHistory) : IDomainEvent;