#region using

using User.Application.Data;
using User.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;
using MassTransit;
using EventSourcing.Events.UserEvents;

#endregion

namespace User.Application.CQRS.User.EventHandlers.Domain;

public class UserCreatedDomainEventHandler(
    IPublishEndpoint publish,
    ILogger<UserCreatedDomainEventHandler> logger) : INotificationHandler<UserCreatedDomainEvent>
{
    #region Implementations

    public async Task Handle(UserCreatedDomainEvent @event, CancellationToken cancellationToken)
    {
        logger.LogInformation("Domain Event handled: {DomainEvent}", @event.GetType().Name);

        var userCreatedEvent = new UserCreatedEvent()
        {
            Email = @event.Email,
            FirstName = @event.FirstName,
            LastName = @event.LastName,
            UserId = @event.Id
        };

        await publish.Publish(userCreatedEvent);
    }

    #endregion
}