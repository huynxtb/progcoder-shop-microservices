
#region using

using User.Api.Constants;
using User.Application.CQRS.User.Commands;
using User.Application.Dtos.Users;
using Microsoft.AspNetCore.Mvc;
using SourceCommon.Models.Reponses;

#endregion

namespace User.Api.Endpoints;

public sealed class UserRegister : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost(ApiRoutes.User.Register, HandleUserRegisterAsync)
            .WithTags(ApiRoutes.User.Tags)
            .WithName(nameof(UserRegister))
            .Produces<ResultSharedResponse<string>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .Produces(StatusCodes.Status404NotFound);
    }

    #endregion

    #region Methods

    private async Task<ResultSharedResponse<string>> HandleUserRegisterAsync(
        ISender sender,
        [FromBody] UserRegisterDto req)
    {
        var command = new UserRegisterCommand(req);

        var result = await sender.Send(command);

        return result;
    }

    #endregion
}
