#region using

using MediatR;
using Microsoft.Extensions.Logging;
using User.Application.Services;
using User.Domain.Events;

#endregion

namespace User.Application.CQRS.User.EventHandlers.Domain;

public sealed class UserDeletedDomainEventHandler(
    IKeycloakService keycloak,
    ILogger<UserCreatedDomainEventHandler> logger) : INotificationHandler<UserDeletedDomainEvent>
{
    #region Implementations

    public async Task Handle(UserDeletedDomainEvent @event, CancellationToken cancellationToken)
    {
        logger.LogInformation("Domain Event handled: {DomainEvent}", @event.GetType().Name);

        await keycloak.DeleteUserAsync(@event.KeycloakUserNo!);
    }

    #endregion
}