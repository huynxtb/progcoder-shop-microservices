#region using

using Notification.Application.Data.Repositories;
using Notification.Application.Dtos.Notifications;
using BuildingBlocks.Abstractions.ValueObjects;
using Notification.Application.Models.Results;

#endregion

namespace Notification.Application.CQRS.Notification.Queries;

public sealed record GetNotificationsQuery(Actor Actor, PaginationRequest Paging) : IQuery<GetNotificationsResult>;

public sealed class GetNotificationsQueryHandler(
    IQueryNotificationRepository queryRepo,
    IMapper mapper)
    : IQueryHandler<GetNotificationsQuery, GetNotificationsResult>
{
    #region Implementations

    public async Task<GetNotificationsResult> Handle(GetNotificationsQuery query, CancellationToken cancellationToken)
    {
        var userId = Guid.Parse(query.Actor.ToString());
        var result = await queryRepo.GetNotificationsAsync(userId, cancellationToken);
        var items = mapper.Map<List<NotificationDto>>(result);
        var reponse = new GetNotificationsResult(items);
        return reponse;
    }

    #endregion
}