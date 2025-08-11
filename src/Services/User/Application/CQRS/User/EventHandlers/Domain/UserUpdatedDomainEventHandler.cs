#region using

using Application.Data;
using Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;

#endregion

namespace Application.CQRS.User.EventHandlers.Domain;

public class UserUpdatedDomainEventHandler(
    IReadDbContext dbContext,
    ILogger<UserUpdatedDomainEventHandler> logger) : INotificationHandler<UserUpdatedDomainEvent>
{
    #region Implementations

    public async Task Handle(UserUpdatedDomainEvent @event, CancellationToken cancellationToken)
    {
        logger.LogInformation("Domain Event handled: {DomainEvent}", @event.GetType().Name);

        var user = @event.User;

        dbContext.Users.Update(user);

        await dbContext.SaveChangesAsync(cancellationToken);
    }

    #endregion
}