#region using

using Common.Models.Reponses;
using Inventory.Api.Constants;
using Inventory.Application.Features.Location.Queries;
using Inventory.Application.Models.Results;

#endregion

namespace Inventory.Api.Endpoints;

public sealed class GetAllLocations : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Location.GetAll, HandleGetAllLocationsAsync)
            .WithTags(ApiRoutes.Location.Tags)
            .WithName(nameof(GetAllLocations))
            .Produces<ApiGetResponse<GetAllLocationsResult>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<GetAllLocationsResult>> HandleGetAllLocationsAsync(
        ISender sender)
    {
        var query = new GetAllLocationsQuery();
        var result = await sender.Send(query);

        return new ApiGetResponse<GetAllLocationsResult>(result);
    }

    #endregion
}

