
#region using

using API.Constants;
using Application.CQRS.User.Commands;
using Application.Dtos.Users;
using Microsoft.AspNetCore.Mvc;
using SourceCommon.Models.Reponses;

#endregion

namespace API.Endpoints;

public sealed class UpdateUserStatus : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut(ApiRoutes.User.UpdateStatus, HandleUpdateUserStatusAsync)
            .WithTags(ApiRoutes.User.Tags)
            .WithName(nameof(UpdateUserStatus))
            .Produces<ResultSharedResponse<string>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .Produces(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ResultSharedResponse<string>> HandleUpdateUserStatusAsync(
        ISender sender,
        [FromRoute] Guid userId,
        [FromBody] UpdateUserStatusDto req)
    {
        var command = new UpdateUserStatusCommand(userId, req);

        var result = await sender.Send(command);

        return result;
    }

    #endregion
}
