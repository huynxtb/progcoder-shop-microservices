//#region using

//using Application.Data;
//using Domain.Events;
//using MediatR;
//using Microsoft.Extensions.Logging;

//#endregion

//namespace Application.CQRS.Agent.EventHandlers.Domain;

//public class KeycloakCreatedEventHandler(IReadDbContext readDbContext,
//    ILogger<KeycloakCreatedEventHandler> logger) : INotificationHandler<KeycloakCreatedEvent>
//{
//    #region Implementations

//    public async Task Handle(KeycloakCreatedEvent domainEvent, CancellationToken cancellationToken)
//    {
//        logger.LogInformation("Domain Event handled: {DomainEvent}", domainEvent.GetType().Name);

//        var entity = domainEvent.User;

//        readDbContext.KeycloakUsers.Add(entity);

//        await readDbContext.SaveChangesAsync(cancellationToken);

//        await Task.CompletedTask;
//    }

//    #endregion
//}