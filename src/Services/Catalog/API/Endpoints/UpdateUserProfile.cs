
#region using

using Catalog.Api.Constants;
using Catalog.Application.CQRS.User.Commands;
using Catalog.Application.Dtos.Users;
using Microsoft.AspNetCore.Mvc;
using SourceCommon.Models.Reponses;

#endregion

namespace Catalog.Api.Endpoints;

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
        var command = new UpdateProductCommand(currentUser.Id, req);

        return await sender.Send(command);
    }

    #endregion
}
