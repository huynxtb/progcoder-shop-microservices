#region using

using Inventory.Api.Constants;
using Inventory.Application.Features.InventoryItem.Queries;
using Inventory.Application.Models.Results;

#endregion

namespace Inventory.Api.Endpoints;

public sealed class GetAllInventoryItems : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.InventoryItem.GetAllInventoryItems, HandleGetAllInventoryItemsAsync)
            .WithTags(ApiRoutes.InventoryItem.Tags)
            .WithName(nameof(GetAllInventoryItems))
            .Produces<ApiGetResponse<GetAllInventoryItemResult>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<GetAllInventoryItemResult>> HandleGetAllInventoryItemsAsync(
        ISender sender)
    {
        var query = new GetAllInventoryItemQuery();
        var result = await sender.Send(query);

        return new ApiGetResponse<GetAllInventoryItemResult>(result);
    }

    #endregion
}

