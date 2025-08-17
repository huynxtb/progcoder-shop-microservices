
#region using

using User.Api.Constants;
using User.Application.CQRS.User.Commands;
using User.Application.Dtos.Users;
using Microsoft.AspNetCore.Mvc;
using SourceCommon.Models.Reponses;

#endregion

namespace User.Api.Endpoints;

public sealed class UpdateUser : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut(ApiRoutes.User.Update, HandleUpdateUserAsync)
            .WithTags(ApiRoutes.User.Tags)
            .WithName(nameof(UpdateUser))
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
        var userId = httpContext.GetCurrentUser().Id;

        var command = new UpdateUserCommand(userId, req);

        var result = await sender.Send(command);

        return result;
    }

    #endregion
}
