#region using

using BuildingBlocks.Pagination;
using Common.Models.Reponses;
using Inventory.Api.Constants;
using Inventory.Application.Features.InventoryItem.Queries;
using Inventory.Application.Models.Filters;
using Inventory.Application.Models.Results;

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
            .Produces<ApiGetResponse<GetInventoryItemsResult>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<GetInventoryItemsResult>> HandleGetInventoryItemsAsync(
        ISender sender,
        [AsParameters] GetInventoryItemsFilter filter,
        [AsParameters] PaginationRequest paging)
    {
        var query = new GetInventoryItemsQuery(filter, paging);
        var result = await sender.Send(query);

        return new ApiGetResponse<GetInventoryItemsResult>(result);
    }

    #endregion
}
