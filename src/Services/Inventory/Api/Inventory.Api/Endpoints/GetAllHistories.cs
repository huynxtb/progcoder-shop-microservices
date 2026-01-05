#region using

using Inventory.Api.Constants;
using Inventory.Application.Features.InventoryItemHistory.Queries;
using Inventory.Application.Models.Results;

#endregion

namespace Inventory.Api.Endpoints;

public sealed class GetAllHistories : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.History.GetAll, HandleGetAllHistoriesAsync)
            .WithTags(ApiRoutes.History.Tags)
            .WithName(nameof(GetAllHistories))
            .Produces<ApiGetResponse<GetAllHistoriesResult>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<GetAllHistoriesResult>> HandleGetAllHistoriesAsync(ISender sender)
    {
        var query = new GetAllHistoriesQuery();
        var result = await sender.Send(query);

        return new ApiGetResponse<GetAllHistoriesResult>(result);
    }

    #endregion
}

