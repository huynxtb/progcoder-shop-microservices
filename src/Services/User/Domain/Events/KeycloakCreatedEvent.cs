#region using

using Domain.Abstractions;
using Domain.Entities;

#endregion

namespace Domain.Events;

public record KeycloakCreatedEvent(KeycloakUser User) : IDomainEvent;