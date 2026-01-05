#region using

using BuildingBlocks.Authentication.Extensions;
using Inventory.Api.Constants;
using Inventory.Application.Features.Location.Commands;
using Inventory.Application.Dtos.Locations;
using Microsoft.AspNetCore.Mvc;

#endregion

namespace Inventory.Api.Endpoints;

public sealed class CreateLocation : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost(ApiRoutes.Location.Create, HandleCreateLocationAsync)
            .WithTags(ApiRoutes.Location.Tags)
            .WithName(nameof(CreateLocation))
            .Produces<ApiCreatedResponse<Guid>>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiCreatedResponse<Guid>> HandleCreateLocationAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [FromBody] CreateLocationDto dto)
    {
        var currentUser = httpContext.GetCurrentUser();
        var command = new CreateLocationCommand(dto, Actor.User(currentUser.Email));

        var result = await sender.Send(command);

        return new ApiCreatedResponse<Guid>(result);
    }

    #endregion
}

