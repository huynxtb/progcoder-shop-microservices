
#region using

using User.Api.Constants;
using User.Application.CQRS.User.Commands;
using User.Application.Dtos.Users;
using Microsoft.AspNetCore.Mvc;
using SourceCommon.Models.Reponses;

#endregion

namespace User.Api.Endpoints;

public sealed class CreateUser : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost(ApiRoutes.User.Create, HandleCreateUserAsync)
            .WithTags(ApiRoutes.User.Tags)
            .WithName(nameof(CreateUser))
            .Produces<ResultSharedResponse<string>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .Produces(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ResultSharedResponse<string>> HandleCreateUserAsync(
        ISender sender,
        [FromBody] CreateUserDto req)
    {
        var command = new CreateUserCommand(req);

        var result = await sender.Send(command);

        return result;
    }

    #endregion
}
