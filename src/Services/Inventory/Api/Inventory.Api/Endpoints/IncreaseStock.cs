#region using

using BuildingBlocks.Abstractions.ValueObjects;
using BuildingBlocks.Authentication.Extensions;
using Common.Extensions;
using Common.Models.Reponses;
using Inventory.Api.Constants;
using Inventory.Application.CQRS.InventoryItem.Commands;
using Inventory.Application.Dtos.InventoryItems;
using Inventory.Domain.Enums;
using Microsoft.AspNetCore.Mvc;

#endregion

namespace Inventory.Api.Endpoints;

public sealed class IncreaseStock : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut(ApiRoutes.InventoryItem.IncreaseStock, HandleUpdateStockAsync)
            .WithTags(ApiRoutes.InventoryItem.Tags)
            .WithName(nameof(IncreaseStock))
            .Produces<ApiUpdatedResponse<Guid>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiUpdatedResponse<Guid>> HandleUpdateStockAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [FromRoute] Guid inventoryItemId,
        [FromBody] UpdateStockDto dto)
    {
        var currentUser = httpContext.GetCurrentUser();
        dto.Source = InventorySource.ManualAdjustment.GetDescription();
        var command = new UpdateStockCommand(inventoryItemId, InventoryChangeType.Increase, dto, Actor.User(currentUser.Email));
        var result = await sender.Send(command);

        return new ApiUpdatedResponse<Guid>(result);
    }

    #endregion
}
