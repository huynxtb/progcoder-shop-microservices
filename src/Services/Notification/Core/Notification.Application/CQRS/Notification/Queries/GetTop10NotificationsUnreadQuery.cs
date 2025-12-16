#region using

using Notification.Application.Data.Repositories;
using Notification.Application.Dtos.Notifications;
using BuildingBlocks.Abstractions.ValueObjects;
using Notification.Application.Models.Results;

#endregion

namespace Notification.Application.CQRS.Notification.Queries;

public sealed record GetTop10NotificationsUnreadQuery(Actor Actor) : IQuery<GetTop10NotificationsUnreadResult>;

public sealed class GetTop10NotificationsUnreadQueryHandler(
    IQueryNotificationRepository queryRepo,
    IMapper mapper)
    : IQueryHandler<GetTop10NotificationsUnreadQuery, GetTop10NotificationsUnreadResult>
{
    #region Implementations

    public async Task<GetTop10NotificationsUnreadResult> Handle(GetTop10NotificationsUnreadQuery query, CancellationToken cancellationToken)
    {
        var userId = Guid.Parse(query.Actor.ToString());
        var result = await queryRepo.GetTop10NotificationsUnreadAsync(userId, cancellationToken);
        var items = mapper.Map<List<NotificationDto>>(result);
        var response = new GetTop10NotificationsUnreadResult(items);
        return response;
    }

    #endregion
}
