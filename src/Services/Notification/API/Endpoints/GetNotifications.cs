#region using

using BuildingBlocks.Pagination;
using Notification.Api.Constants;
using Notification.Application.CQRS.Notification.Queries;
using Notification.Application.Models.Responses;
using SourceCommon.Models.Reponses;

#endregion

namespace Notification.Api.Endpoints;

public sealed class GetNotifications : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Notification.GetNotifications, HandleGetNotificationsAsync)
            .WithTags(ApiRoutes.Notification.Tags)
            .WithName(nameof(GetNotifications))
            .Produces<ResultSharedResponse<GetNotificationsReponse>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ResultSharedResponse<GetNotificationsReponse>> HandleGetNotificationsAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [AsParameters] PaginationRequest paging)
    {
        var query = new GetNotificationsQuery(
            httpContext.GetCurrentUser().Id,
            paging);

        var result = await sender.Send(query);

        return result;
    }

    #endregion
}
