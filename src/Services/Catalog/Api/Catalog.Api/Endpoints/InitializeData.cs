#region using

using BuildingBlocks.Authentication.Extensions;
using Catalog.Api.Constants;
using Catalog.Application.Features.System;

#endregion

namespace Catalog.Api.Endpoints;

public sealed class InitializeData : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost(ApiRoutes.System.InitializeData, HandleInitializeDataAsync)
            .WithTags(ApiRoutes.System.Tags)
            .WithName(nameof(InitializeData))
            .Produces<ApiUpdatedResponse<bool>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiUpdatedResponse<bool>> HandleInitializeDataAsync(
        ISender sender,
        IHttpContextAccessor httpContext)
    {
        var currentUser = httpContext.GetCurrentUser();
        var command = new InitialDataCommand(Actor.User(currentUser.Email));
        var result = await sender.Send(command);

        return new ApiUpdatedResponse<bool>(result);
    }

    #endregion
}

