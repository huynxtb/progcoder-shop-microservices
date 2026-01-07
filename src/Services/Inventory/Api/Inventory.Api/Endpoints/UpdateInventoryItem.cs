#region using

using BuildingBlocks.Authentication.Extensions;
using Inventory.Api.Constants;
using Inventory.Application.Features.InventoryItem.Commands;
using Inventory.Application.Dtos.InventoryItems;
using Microsoft.AspNetCore.Mvc;

#endregion

namespace Inventory.Api.Endpoints;

public sealed class UpdateInventoryItem : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut(ApiRoutes.InventoryItem.Update, HandleUpdateInventoryItemAsync)
            .WithTags(ApiRoutes.InventoryItem.Tags)
            .WithName(nameof(UpdateInventoryItem))
            .Produces<ApiUpdatedResponse<Guid>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiUpdatedResponse<Guid>> HandleUpdateInventoryItemAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [FromRoute] Guid inventoryItemId,
        [FromBody] UpdateInventoryItemDto dto)
    {
        var currentUser = httpContext.GetCurrentUser();
        var command = new UpdateInventoryItemCommand(inventoryItemId, dto, Actor.User(currentUser.Email));

        var result = await sender.Send(command);

        return new ApiUpdatedResponse<Guid>(result);
    }

    #endregion
}

