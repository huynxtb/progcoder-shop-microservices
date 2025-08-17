#region using

using User.Application.Data;
using User.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;

#endregion

namespace User.Application.CQRS.User.EventHandlers.Domain;

public class UserCreatedDomainEventHandler(
    IApplicationDbContext dbContext,
    ILogger<UserCreatedDomainEventHandler> logger) : INotificationHandler<UserCreatedDomainEvent>
{
    #region Implementations

    public async Task Handle(UserCreatedDomainEvent @event, CancellationToken cancellationToken)
    {
        logger.LogInformation("Domain Event handled: {DomainEvent}", @event.GetType().Name);

        var user = @event.User;

        //await dbContext.Users.AddAsync(user);

        //await dbContext.SaveChangesAsync(cancellationToken);
    }

    #endregion
}