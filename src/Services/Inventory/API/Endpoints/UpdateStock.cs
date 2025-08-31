#region using

using Inventory.Api.Constants;
using Inventory.Application.CQRS.InventoryItem.Commands;
using Inventory.Application.Dtos.InventoryItems;
using Microsoft.AspNetCore.Mvc;
using SourceCommon.Models.Reponses;

#endregion

namespace Inventory.Api.Endpoints;

public sealed class UpdateStock : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut(ApiRoutes.InventoryItem.UpdateStock, HandleUpdateStockAsync)
            .WithTags(ApiRoutes.InventoryItem.Tags)
            .WithName(nameof(UpdateStock))
            .Produces<ResultSharedResponse<string>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ResultSharedResponse<string>> HandleUpdateStockAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [FromRoute] Guid inventoryItemId,
        [FromBody] UpdateStockDto dto)
    {
        var currentUser = httpContext.GetCurrentUser();
        var command = new UpdateStockCommand(inventoryItemId, dto, currentUser.Id);
        return await sender.Send(command);
    }

    #endregion
}
