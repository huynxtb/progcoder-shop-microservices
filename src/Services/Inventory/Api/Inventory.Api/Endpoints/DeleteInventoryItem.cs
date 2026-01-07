#region using

using Inventory.Api.Constants;
using Inventory.Application.Features.InventoryItem.Commands;
using Microsoft.AspNetCore.Mvc;

#endregion

namespace Inventory.Api.Endpoints;

public sealed class DeleteInventoryItem : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete(ApiRoutes.InventoryItem.Delete, HandleDeleteInventoryItemAsync)
            .WithTags(ApiRoutes.InventoryItem.Tags)
            .WithName(nameof(DeleteInventoryItem))
            .Produces<ApiDeletedResponse<Guid>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiDeletedResponse<Guid>> HandleDeleteInventoryItemAsync(
        ISender sender,
        [FromRoute] Guid inventoryItemId)
    {
        var command = new DeleteInventoryItemCommand(inventoryItemId);

        await sender.Send(command);

        return new ApiDeletedResponse<Guid>(inventoryItemId);
    }

    #endregion
}

