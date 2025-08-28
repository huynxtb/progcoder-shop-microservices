//#region using

//using MediatR;
//using Microsoft.Extensions.Logging;
//using Inventory.Application.Constants;
//using Inventory.Application.Dtos.Keycloaks;
//using Inventory.Application.Services;
//using Inventory.Domain.Events;

//#endregion

//namespace Inventory.Application.CQRS.Inventory.EventHandlers.Domain;

//public sealed class UserCreatedDomainEventHandler(
//    IKeycloakService keycloak,
//    ILogger<UserCreatedDomainEventHandler> logger) : INotificationHandler<UserCreatedDomainEvent>
//{
//    #region Implementations

//    public async Task Handle(UserCreatedDomainEvent @event, CancellationToken cancellationToken)
//    {
//        logger.LogInformation("Domain Event handled: {DomainEvent}", @event.GetType().Name);

//        var keycloakUser = new KcUserDto
//        {
//            UserName = @event.UserName,
//            Email = @event.Email,
//            FirstName = @event.FirstName,
//            LastName = @event.LastName,
//            Credentials =
//            [
//                new()
//                {
//                    Type = KeycloakUserAttributes.Password,
//                    Value = @event.Password,
//                    Temporary = false
//                }
//            ],
//        };

//        await keycloak.CreateUserAsync(keycloakUser);
//    }

//    #endregion
//}