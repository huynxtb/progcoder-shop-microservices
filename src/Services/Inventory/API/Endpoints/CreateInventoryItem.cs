#region using

using BuildingBlocks.Abstractions.ValueObjects;
using Common.Models.Reponses;
using Inventory.Api.Constants;
using Inventory.Application.CQRS.InventoryItem.Commands;
using Inventory.Application.Dtos.InventoryItems;
using Microsoft.AspNetCore.Mvc;

#endregion

namespace Inventory.Api.Endpoints;

public sealed class CreateInventoryItem : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost(ApiRoutes.InventoryItem.Create, HandleCreateInventoryItemAsync)
            .WithTags(ApiRoutes.InventoryItem.Tags)
            .WithName(nameof(CreateInventoryItem))
            .Produces<ResultSharedResponse<string>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ResultSharedResponse<string>> HandleCreateInventoryItemAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [FromBody] CreateInventoryItemDto dto)
    {
        var currentUser = httpContext.GetCurrentUser();
        var command = new CreateInventoryItemCommand(dto, Actor.User(currentUser.Id));
        return await sender.Send(command);
    }

    #endregion
}
