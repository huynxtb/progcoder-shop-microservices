#region using

using BuildingBlocks.Authentication.Extensions;
using Inventory.Api.Constants;
using Inventory.Application.Features.InventoryItem.Commands;
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
            .Produces<ApiCreatedResponse<Guid>>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiCreatedResponse<Guid>> HandleCreateInventoryItemAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [FromBody] CreateInventoryItemDto dto)
    {
        var currentUser = httpContext.GetCurrentUser();
        var command = new CreateInventoryItemCommand(dto, Actor.User(currentUser.Email));

        var result = await sender.Send(command);

        return new ApiCreatedResponse<Guid>(result);
    }

    #endregion
}
