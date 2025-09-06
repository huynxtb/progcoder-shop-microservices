#region using

using Inventory.Api.Constants;
using Inventory.Application.CQRS.InventoryItem.Commands;
using Inventory.Application.Dtos.InventoryItems;
using Inventory.Domain.Enums;
using Microsoft.AspNetCore.Mvc;
using Common.Models.Reponses;
using BuildingBlocks.Abstractions.ValueObjects;
using Common.Extensions;

#endregion

namespace Inventory.Api.Endpoints;

public sealed class DecreaseStock : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut(ApiRoutes.InventoryItem.DecreaseStock, HandleUpdateStockAsync)
            .WithTags(ApiRoutes.InventoryItem.Tags)
            .WithName(nameof(DecreaseStock))
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
        dto.Source = InventorySource.ManualAdjustment.GetDescription();
        var command = new UpdateStockCommand(inventoryItemId, InventoryChangeType.Decrease, dto, Actor.User(currentUser.Id));
        return await sender.Send(command);
    }

    #endregion
}
