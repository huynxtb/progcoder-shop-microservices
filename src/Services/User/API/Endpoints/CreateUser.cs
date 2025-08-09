
#region using

using API.Constants;
using Application.CQRS.AccountProfile.Queries;
using Application.CQRS.User.Commands;
using Application.Dtos.Users;
using Application.Models.Responses;
using BuildingBlocks.Pagination;
using Microsoft.AspNetCore.Mvc;
using SourceCommon.Models.Reponses;

#endregion

namespace API.Endpoints;

public sealed class CreateUser : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost(ApiRoutes.User.Base, CreateUserAsync)
            .WithTags(ApiRoutes.User.Tags)
            .WithName(nameof(CreateUser))
            .Produces<ResultSharedResponse<string>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .Produces(StatusCodes.Status404NotFound);
    }

    #endregion

    #region Methods

    private async Task<ResultSharedResponse<string>> CreateUserAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [FromBody] CreateUserDto req)
    {
        var reqUserId = httpContext.GetCurrentUser().Id!;

        var command = new CreateUserCommand(
            req,
            reqUserId);

        var result = await sender.Send(command);

        return result;
    }

    #endregion
}
