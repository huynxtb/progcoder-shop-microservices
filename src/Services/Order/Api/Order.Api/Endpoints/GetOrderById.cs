#region using

using Order.Api.Constants;
using Order.Application.CQRS.Order.Queries;
using Order.Application.Models.Results;
using Microsoft.AspNetCore.Mvc;

#endregion

namespace Order.Api.Endpoints;

public sealed class GetOrderById : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Order.GetOrderById, HandleGetOrderByIdAsync)
            .WithTags(ApiRoutes.Order.Tags)
            .WithName(nameof(GetOrderById))
            .Produces<GetOrderByIdResult>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<GetOrderByIdResult> HandleGetOrderByIdAsync(
        ISender sender,
        [FromRoute] Guid orderId)
    {
        var query = new GetOrderByIdQuery(orderId);

        return await sender.Send(query);
    }

    #endregion
}