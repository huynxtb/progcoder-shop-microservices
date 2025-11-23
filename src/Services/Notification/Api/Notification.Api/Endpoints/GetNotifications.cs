#region using

using BuildingBlocks.Pagination;
using Notification.Api.Constants;
using Notification.Application.CQRS.Notification.Queries;
using BuildingBlocks.Abstractions.ValueObjects;
using BuildingBlocks.Authentication.Extensions;
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
            .Produces<GetNotificationsResult>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<GetNotificationsResult> HandleGetNotificationsAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [AsParameters] PaginationRequest paging)
    {
        var currentUser = httpContext.GetCurrentUser();
        var query = new GetNotificationsQuery(Actor.User(currentUser.Id), paging);
        var result = await sender.Send(query);
        return result;
    }

    #endregion
}
