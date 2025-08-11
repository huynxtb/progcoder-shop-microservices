#region using

using Application.Data;
using Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;

#endregion

namespace Application.CQRS.User.EventHandlers.Domain;

public class UserDeletedDomainEventHandler(
    IReadDbContext dbContext,
    ILogger<UserDeletedDomainEventHandler> logger) : INotificationHandler<UserDeletedDomainEvent>
{
    #region Implementations

    public async Task Handle(UserDeletedDomainEvent @event, CancellationToken cancellationToken)
    {
        logger.LogInformation("Domain Event handled: {DomainEvent}", @event.GetType().Name);

        var user = @event.User;

        dbContext.Users.Remove(user);

        await dbContext.SaveChangesAsync(cancellationToken);
    }

    #endregion
}