#region using

using Microsoft.AspNetCore.Mvc;
using Notification.Api.Constants;
using Notification.Application.CQRS.Notification.Commands;
using Common.Models.Reponses;
using BuildingBlocks.Abstractions.ValueObjects;
using BuildingBlocks.Authentication.Extensions;
using Notification.Application.Dtos.Notifications;

#endregion

namespace Notification.Api.Endpoints;

public sealed class MarkAsRead : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost(ApiRoutes.Notification.MarkAsRead, HandleMarkAsReadAsync)
            .WithTags(ApiRoutes.Notification.Tags)
            .WithName(nameof(MarkAsRead))
            .Produces<ApiUpdatedResponse<Unit>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiUpdatedResponse<Unit>> HandleMarkAsReadAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [FromBody] MarkAsReadNotificationDto req)
    {
        var currentUser = httpContext.GetCurrentUser();
        var command = new MarkAsReadNotificationCommand(req, Actor.User(currentUser.Id));
        var result = await sender.Send(command);

        return new ApiUpdatedResponse<Unit>(result);
    }

    #endregion
}
