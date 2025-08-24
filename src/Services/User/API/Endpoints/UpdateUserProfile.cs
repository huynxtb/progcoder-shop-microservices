
#region using

using User.Api.Constants;
using User.Application.CQRS.User.Commands;
using User.Application.Dtos.Users;
using Microsoft.AspNetCore.Mvc;
using SourceCommon.Models.Reponses;

#endregion

namespace User.Api.Endpoints;

public sealed class UpdateUserProfile : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut(ApiRoutes.User.UpdateCurrentUser, HandleUpdateUserAsync)
            .WithTags(ApiRoutes.User.Tags)
            .WithName(nameof(UpdateUserProfile))
            .Produces<ResultSharedResponse<string>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .Produces(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ResultSharedResponse<string>> HandleUpdateUserAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [FromBody] UpdateUserDto req)
    {
        var currentUser = httpContext.GetCurrentUser();
        var command = new UpdateUserProfileCommand(currentUser.Id, req);

        return await sender.Send(command);
    }

    #endregion
}
