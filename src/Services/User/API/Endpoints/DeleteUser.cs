
#region using

using User.Api.Constants;
using User.Application.CQRS.User.Commands;
using Microsoft.AspNetCore.Mvc;
using SourceCommon.Models.Reponses;

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
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .Produces(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ResultSharedResponse<string>> HandleDeleteUserAsync(
        ISender sender,
        [FromRoute] Guid userId)
    {
        var command = new DeleteUserCommand(userId);

        var result = await sender.Send(command);

        return result;
    }

    #endregion
}
