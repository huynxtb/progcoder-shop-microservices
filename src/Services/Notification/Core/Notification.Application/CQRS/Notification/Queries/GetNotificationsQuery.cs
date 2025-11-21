#region using

using Notification.Application.Data.Repositories;
using Notification.Application.Dtos.Notifications;
using Notification.Application.Models.Responses;
using BuildingBlocks.Abstractions.ValueObjects;

#endregion

namespace Notification.Application.CQRS.Notification.Queries;

public sealed record GetNotificationsQuery(Actor Actor, PaginationRequest Paging) : IQuery<GetNotificationsReponse>;

public sealed class GetNotificationsQueryHandler(
    IQueryNotificationRepository queryRepo,
    IMapper mapper)
    : IQueryHandler<GetNotificationsQuery, GetNotificationsReponse>
{
    #region Implementations

    public async Task<GetNotificationsReponse> Handle(GetNotificationsQuery query, CancellationToken cancellationToken)
    {
        var result = await queryRepo.GetNotificationsAsync(Guid.Parse(query.Actor.ToString()), cancellationToken);
        var items = mapper.Map<List<NotificationDto>>(result);
        var reponse = new GetNotificationsReponse(items);
        return reponse;
    }

    #endregion
}