#region using

using Microsoft.AspNetCore.Mvc;
using Notification.Api.Constants;
using Notification.Application.CQRS.Notification.Commands;
using SourceCommon.Models.Reponses;

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
            .Produces<ResultSharedResponse<string>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .Produces(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ResultSharedResponse<string>> HandleMarkAsReadAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [FromRoute] string notificationId)
    {
        var command = new MarkAsReadNotificationCommand(Guid.Parse(notificationId), httpContext.GetCurrentUser().Id);

        var result = await sender.Send(command);

        return result;
    }

    #endregion
}
