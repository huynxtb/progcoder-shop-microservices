#region using

using Notification.Application.Data.Repositories;
using Notification.Application.Dtos.Notifications;
using Notification.Application.Models.Responses;
using Common.Models.Reponses;
using BuildingBlocks.Abstractions.ValueObjects;

#endregion

namespace Notification.Application.CQRS.Notification.Queries;

public sealed record GetNotificationsQuery(Actor Actor, PaginationRequest Paging) : IQuery<ResultSharedResponse<GetNotificationsReponse>>;

public sealed class GetNotificationsQueryHandler(IQueryNotificationRepository queryRepo)
    : IQueryHandler<GetNotificationsQuery, ResultSharedResponse<GetNotificationsReponse>>
{
    #region Implementations

    public async Task<ResultSharedResponse<GetNotificationsReponse>> Handle(GetNotificationsQuery query, CancellationToken cancellationToken)
    {
        var result = await queryRepo.GetNotificationsAsync(Guid.Parse(query.Actor.ToString()), cancellationToken);

        var reponse = new GetNotificationsReponse()
        {
            Items = result.Adapt<List<NotificationDto>>()
        };

        return ResultSharedResponse<GetNotificationsReponse>
            .Success(reponse, MessageCode.GetSuccess);
    }

    #endregion
}