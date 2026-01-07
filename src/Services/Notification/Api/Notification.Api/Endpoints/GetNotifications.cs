#region using

using BuildingBlocks.Pagination;
using Common.ValueObjects;
using BuildingBlocks.Authentication.Extensions;
using Common.Models.Reponses;
using Notification.Api.Constants;
using Notification.Application.Features.Notification.Queries;
using Notification.Application.Models.Results;

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
            .Produces<ApiGetResponse<GetNotificationsResult>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<GetNotificationsResult>> HandleGetNotificationsAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [AsParameters] PaginationRequest paging)
    {
        var currentUser = httpContext.GetCurrentUser();
        var query = new GetNotificationsQuery(Actor.User(currentUser.Id), paging);
        var result = await sender.Send(query);

        return new ApiGetResponse<GetNotificationsResult>(result);
    }

    #endregion
}
