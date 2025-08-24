#region using

using MediatR;
using Microsoft.Extensions.Logging;
using User.Application.Constants;
using User.Application.Dtos.Keycloaks;
using User.Application.Services;
using User.Domain.Events;

#endregion

namespace User.Application.CQRS.User.EventHandlers.Domain;

public sealed class UserUpdatedDomainEventHandler(
    IKeycloakService keycloak,
    ILogger<UserCreatedDomainEventHandler> logger) : INotificationHandler<UserUpdatedDomainEvent>
{
    #region Implementations

    public async Task Handle(UserUpdatedDomainEvent @event, CancellationToken cancellationToken)
    {
        logger.LogInformation("Domain Event handled: {DomainEvent}", @event.GetType().Name);

        var keycloakUser = new KcUserDto
        {
            FirstName = @event.FirstName,
            LastName = @event.LastName,
            Email = @event.Email,
            Enabled = @event.Enable,
            Attributes = new Dictionary<string, string[]>()
            {
                { KeycloakUserAttributes.PhoneNumber, [@event.PhoneNumber ?? string.Empty] }
            }
        };

        await keycloak.UpdateUserAsync(@event.Id.ToString()!, keycloakUser);
    }

    #endregion
}