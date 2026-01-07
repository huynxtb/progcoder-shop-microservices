#region using

using Inventory.Api.Constants;
using Inventory.Application.Features.InventoryReservation.Queries;
using Inventory.Application.Models.Results;

#endregion

namespace Inventory.Api.Endpoints;

public sealed class GetAllReservations : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Reservation.GetAll, HandleGetAllReservationsAsync)
            .WithTags(ApiRoutes.Reservation.Tags)
            .WithName(nameof(GetAllReservations))
            .Produces<ApiGetResponse<GetAllInventoryReservationResult>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<GetAllInventoryReservationResult>> HandleGetAllReservationsAsync(
        ISender sender)
    {
        var query = new GetAllInventoryReservationQuery();
        var result = await sender.Send(query);

        return new ApiGetResponse<GetAllInventoryReservationResult>(result);
    }

    #endregion
}

