#region using

using Domain.Abstractions;
using Domain.Entities;

#endregion

namespace Domain.Events;

public record AgentCreatedEvent(Agent Agent) : IDomainEvent;