#region using

using BuildingBlocks.Authentication.Extensions;
using Notification.Api.Constants;
using Notification.Application.Features.Notification.Queries;
using Notification.Application.Models.Results;

#endregion

namespace Notification.Api.Endpoints;

public sealed class GetTop10NotificationsUnread : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Notification.GetTop10Unread, HandleGetTop10NotificationsUnreadAsync)
            .WithTags(ApiRoutes.Notification.Tags)
            .WithName(nameof(GetTop10NotificationsUnread))
            .Produces<ApiGetResponse<GetTop10NotificationsUnreadResult>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<GetTop10NotificationsUnreadResult>> HandleGetTop10NotificationsUnreadAsync(
        ISender sender,
        IHttpContextAccessor httpContext)
    {
        var currentUser = httpContext.GetCurrentUser();
        var query = new GetTop10NotificationsUnreadQuery(Actor.User(currentUser.Id));
        var result = await sender.Send(query);

        return new ApiGetResponse<GetTop10NotificationsUnreadResult>(result);
    }

    #endregion
}

