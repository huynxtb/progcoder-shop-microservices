#region using

using Domain.Events;
using MassTransit;
using MediatR;
using Microsoft.Extensions.Logging;

#endregion

namespace Application.CQRS.Agent.EventHandlers.Domain;

public class AgentCreatedEventHandler(
    IPublishEndpoint publishEndpoint, 
    ILogger<AgentCreatedEventHandler> logger) : INotificationHandler<AgentCreatedEvent>
{
    #region Implementations

    public async Task Handle(AgentCreatedEvent domainEvent, CancellationToken cancellationToken)
    {
        logger.LogInformation("Domain Event handled: {DomainEvent}", domainEvent.GetType().Name);

        // TO-DO
        //var orderCreatedIntegrationEvent = domainEvent.Agent;
        //await publishEndpoint.Publish(orderCreatedIntegrationEvent, cancellationToken);

        await Task.CompletedTask;
    }

    #endregion
}