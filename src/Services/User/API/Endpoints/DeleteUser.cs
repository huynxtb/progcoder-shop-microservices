
#region using

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SourceCommon.Models.Reponses;
using User.Api.Constants;
using User.Application.CQRS.User.Commands;

#endregion

namespace User.Api.Endpoints;

public sealed class DeleteUser : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete(ApiRoutes.User.Delete, HandleDeleteUserAsync)
            .WithTags(ApiRoutes.User.Tags)
            .WithName(nameof(DeleteUser))
            .Produces<ResultSharedResponse<string>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ResultSharedResponse<string>> HandleDeleteUserAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [FromRoute] Guid userId)
    {
        var currentUser = httpContext.GetCurrentUser();
        var command = new DeleteUserCommand(userId, currentUser.Id);

        return await sender.Send(command);
    }

    #endregion
}
