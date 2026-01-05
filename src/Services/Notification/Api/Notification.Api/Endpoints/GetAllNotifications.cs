#region using

using BuildingBlocks.Abstractions.ValueObjects;
using BuildingBlocks.Authentication.Extensions;
using Common.Models.Reponses;
using Notification.Api.Constants;
using Notification.Application.Features.Notification.Queries;
using Notification.Application.Models.Results;

#endregion

namespace Notification.Api.Endpoints;

public sealed class GetAllNotifications : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Notification.GetAllNotifications, HandleGetAllNotificationsAsync)
            .WithTags(ApiRoutes.Notification.Tags)
            .WithName(nameof(GetAllNotifications))
            .Produces<ApiGetResponse<GetAllNotificationsResult>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<GetAllNotificationsResult>> HandleGetAllNotificationsAsync(
        ISender sender,
        IHttpContextAccessor httpContext)
    {
        var currentUser = httpContext.GetCurrentUser();
        var query = new GetAllNotificationsQuery(Actor.User(currentUser.Id));
        var result = await sender.Send(query);

        return new ApiGetResponse<GetAllNotificationsResult>(result);
    }

    #endregion
}

