
#region using

using Catalog.Api.Constants;
using Catalog.Application.CQRS.User.Commands;
using Catalog.Application.Dtos.Users;
using Microsoft.AspNetCore.Mvc;
using SourceCommon.Models.Reponses;

#endregion

namespace Catalog.Api.Endpoints;

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
        IHttpContextAccessor httpContext,
        [FromRoute] Guid userId,
        [FromBody] UpdateUserStatusDto req)
    {
        var currentUser = httpContext.GetCurrentUser();
        var command = new UpdateProductStatusCommand(userId, req, currentUser.Id);

        return await sender.Send(command);
    }

    #endregion
}
