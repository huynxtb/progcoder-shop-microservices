#region using

using BuildingBlocks.Abstractions.ValueObjects;
using Common.Extensions;
using Common.Models.Reponses;
using Order.Api.Constants;
using Order.Application.CQRS.InventoryItem.Commands;
using Order.Application.Dtos.InventoryItems;
using Order.Domain.Enums;
using Microsoft.AspNetCore.Mvc;

#endregion

namespace Order.Api.Endpoints;

public sealed class IncreaseStock : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut(ApiRoutes.InventoryItem.IncreaseStock, HandleUpdateStockAsync)
            .WithTags(ApiRoutes.InventoryItem.Tags)
            .WithName(nameof(IncreaseStock))
            .Produces<Guid>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<Guid> HandleUpdateStockAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [FromRoute] Guid inventoryItemId,
        [FromBody] UpdateStockDto dto)
    {
        var currentUser = httpContext.GetCurrentUser();
        dto.Source = InventorySource.ManualAdjustment.GetDescription();
        var command = new UpdateStockCommand(inventoryItemId, InventoryChangeType.Increase, dto, Actor.User(currentUser.Id));
        return await sender.Send(command);
    }

    #endregion
}
