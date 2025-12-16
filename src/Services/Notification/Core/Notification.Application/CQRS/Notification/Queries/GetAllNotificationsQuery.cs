#region using

using Notification.Application.Data.Repositories;
using Notification.Application.Dtos.Notifications;
using BuildingBlocks.Abstractions.ValueObjects;
using Notification.Application.Models.Results;

#endregion

namespace Notification.Application.CQRS.Notification.Queries;

public sealed record GetAllNotificationsQuery(Actor Actor) : IQuery<GetAllNotificationsResult>;

public sealed class GetAllNotificationsQueryHandler(
    IQueryNotificationRepository queryRepo,
    IMapper mapper)
    : IQueryHandler<GetAllNotificationsQuery, GetAllNotificationsResult>
{
    #region Implementations

    public async Task<GetAllNotificationsResult> Handle(GetAllNotificationsQuery query, CancellationToken cancellationToken)
    {
        var userId = Guid.Parse(query.Actor.ToString());
        var result = await queryRepo.GetAllNotificationsAsync(userId, cancellationToken);
        var items = mapper.Map<List<NotificationDto>>(result);
        var response = new GetAllNotificationsResult(items);
        return response;
    }

    #endregion
}
