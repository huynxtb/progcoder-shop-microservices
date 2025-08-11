#region using

using Application.Data;
using Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;

#endregion

namespace Application.CQRS.Keycloak.EventHandlers.Domain;

public class LoginHistoryCreatedDomainEventHandler(
    IReadDbContext dbContext,
    ILogger<LoginHistoryCreatedDomainEventHandler> logger) : INotificationHandler<LoginHistoryCreatedDomainEvent>
{
    #region Implementations

    public async Task Handle(LoginHistoryCreatedDomainEvent @event, CancellationToken cancellationToken)
    {
        logger.LogInformation("Domain Event handled: {DomainEvent}", @event.GetType().Name);

        var loginHistory = @event.LoginHistory;

        await dbContext.LoginHistories.AddAsync(loginHistory);

        await dbContext.SaveChangesAsync(cancellationToken);
    }

    #endregion
}