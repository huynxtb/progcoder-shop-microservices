#region using

using BuildingBlocks.Pagination;
using Inventory.Api.Constants;
using Inventory.Application.CQRS.InventoryItem.Queries;
using Inventory.Application.Models.Filters;
using Inventory.Application.Models.Responses;

#endregion

namespace Inventory.Api.Endpoints;

public sealed class GetInventoryItems : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.InventoryItem.GetInventoryItems, HandleGetInventoryItemsAsync)
            .WithTags(ApiRoutes.InventoryItem.Tags)
            .WithName(nameof(GetInventoryItems))
            .Produces<GetInventoryItemsResponse>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<GetInventoryItemsResponse> HandleGetInventoryItemsAsync(
        ISender sender,
        [AsParameters] GetInventoryItemsFilter filter,
        [AsParameters] PaginationRequest paging)
    {
        var query = new GetInventoryItemsQuery(filter, paging);
        return await sender.Send(query);
    }

    #endregion
}
