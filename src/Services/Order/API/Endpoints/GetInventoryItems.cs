#region using

using BuildingBlocks.Pagination;
using Order.Api.Constants;
using Order.Application.CQRS.InventoryItem.Queries;
using Order.Application.Models.Filters;
using Order.Application.Models.Responses;
using Common.Models.Reponses;

#endregion

namespace Order.Api.Endpoints;

public sealed class GetInventoryItems : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.InventoryItem.GetInventoryItems, HandleGetInventoryItemsAsync)
            .WithTags(ApiRoutes.InventoryItem.Tags)
            .WithName(nameof(GetInventoryItems))
            .Produces<ResultSharedResponse<GetInventoryItemsResponse>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ResultSharedResponse<GetInventoryItemsResponse>> HandleGetInventoryItemsAsync(
        ISender sender,
        [AsParameters] GetInventoryItemsFilter filter,
        [AsParameters] PaginationRequest paging)
    {
        var query = new GetInventoryItemsQuery(filter, paging);
        return await sender.Send(query);
    }

    #endregion
}
