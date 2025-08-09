#region using

using Application.Dtos.Keycloaks;
using Application.Services;
using Domain.Events;
using MassTransit;
using MediatR;
using Microsoft.Extensions.Logging;

#endregion

namespace Application.CQRS.User.EventHandlers.Domain;

public class UserCreatedEventHandler(
    IKeycloakService keycloakService,
    ILogger<UserCreatedEventHandler> logger) : INotificationHandler<UserCreatedDomainEvent>
{
    #region Implementations

    public async Task Handle(UserCreatedDomainEvent domainEvent, CancellationToken cancellationToken)
    {
        logger.LogInformation("Domain Event handled: {DomainEvent}", domainEvent.GetType().Name);

        var userCreated = domainEvent.User;

        var keycloakUser = new KeycloakUserDto
        {
            UserName = userCreated.UserName,
            Email = userCreated.Email,
            FirstName = userCreated.FirstName,
            LastName = userCreated.LastName,
            Credentials =
            [
                new() {
                    Type = "password",
                    Value = domainEvent.Password,
                    Temporary = false
                }
            ],
        };

        await keycloakService.CreateUserAsync(keycloakUser);

        await Task.CompletedTask;
    }

    #endregion
}