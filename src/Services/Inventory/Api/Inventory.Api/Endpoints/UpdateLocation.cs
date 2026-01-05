#region using

using BuildingBlocks.Authentication.Extensions;
using Inventory.Api.Constants;
using Inventory.Application.Features.Location.Commands;
using Inventory.Application.Dtos.Locations;
using Microsoft.AspNetCore.Mvc;

#endregion

namespace Inventory.Api.Endpoints;

public sealed class UpdateLocation : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut(ApiRoutes.Location.Update, HandleUpdateLocationAsync)
            .WithTags(ApiRoutes.Location.Tags)
            .WithName(nameof(UpdateLocation))
            .Produces<ApiUpdatedResponse<Guid>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiUpdatedResponse<Guid>> HandleUpdateLocationAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [FromRoute] Guid locationId,
        [FromBody] UpdateLocationDto dto)
    {
        var currentUser = httpContext.GetCurrentUser();
        var command = new UpdateLocationCommand(locationId, dto, Actor.User(currentUser.Email));

        var result = await sender.Send(command);

        return new ApiUpdatedResponse<Guid>(result);
    }

    #endregion
}

