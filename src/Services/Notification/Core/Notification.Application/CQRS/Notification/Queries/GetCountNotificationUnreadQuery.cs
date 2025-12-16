#region using

using Notification.Application.Data.Repositories;
using BuildingBlocks.Abstractions.ValueObjects;
using Notification.Application.Models.Results;

#endregion

namespace Notification.Application.CQRS.Notification.Queries;

public sealed record GetCountNotificationUnreadQuery(Actor Actor) : IQuery<GetCountNotificationUnreadResult>;

public sealed class GetCountNotificationUnreadQueryHandler(
    IQueryNotificationRepository queryRepo)
    : IQueryHandler<GetCountNotificationUnreadQuery, GetCountNotificationUnreadResult>
{
    #region Implementations

    public async Task<GetCountNotificationUnreadResult> Handle(GetCountNotificationUnreadQuery query, CancellationToken cancellationToken)
    {
        var userId = Guid.Parse(query.Actor.ToString());
        var count = await queryRepo.GetCountNotificationUnreadAsync(userId, cancellationToken);
        var response = new GetCountNotificationUnreadResult(count);
        return response;
    }

    #endregion
}
