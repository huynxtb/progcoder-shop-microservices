
#region using

using User.Api.Constants;
using User.Application.CQRS.User.Commands;
using User.Application.Dtos.Users;
using Microsoft.AspNetCore.Mvc;
using SourceCommon.Models.Reponses;

#endregion

namespace User.Api.Endpoints;

public sealed class UpdateUserStatus : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut(ApiRoutes.User.UpdateStatus, HandleUpdateUserStatusAsync)
            .WithTags(ApiRoutes.User.Tags)
            .WithName(nameof(UpdateUserStatus))
            .Produces<ResultSharedResponse<string>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ResultSharedResponse<string>> HandleUpdateUserStatusAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [FromRoute] Guid userId,
        [FromBody] UpdateUserStatusDto req)
    {
        var currentUser = httpContext.GetCurrentUser();
        var command = new UpdateUserStatusCommand(userId, req, currentUser.Id);

        return await sender.Send(command);
    }

    #endregion
}
