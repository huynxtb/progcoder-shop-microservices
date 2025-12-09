#region using

using Common.Models.Reponses;
using Inventory.Api.Constants;
using Inventory.Application.CQRS.Location.Queries;
using Inventory.Application.Models.Results;
using Microsoft.AspNetCore.Mvc;

#endregion

namespace Inventory.Api.Endpoints;

public sealed class GetLocationById : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Location.GetById, HandleGetLocationByIdAsync)
            .WithTags(ApiRoutes.Location.Tags)
            .WithName(nameof(GetLocationById))
            .Produces<ApiGetResponse<GetLocationByIdResult>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<GetLocationByIdResult>> HandleGetLocationByIdAsync(
        ISender sender,
        [FromRoute] Guid locationId)
    {
        var query = new GetLocationByIdQuery(locationId);
        var result = await sender.Send(query);

        return new ApiGetResponse<GetLocationByIdResult>(result);
    }

    #endregion
}

