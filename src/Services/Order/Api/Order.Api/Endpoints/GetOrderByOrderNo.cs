#region using

using Order.Api.Constants;
using Order.Application.Features.Order.Queries;
using Order.Application.Models.Results;
using Microsoft.AspNetCore.Mvc;

#endregion

namespace Order.Api.Endpoints;

public sealed class GetOrderByOrderNo : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Order.GetOrderByOrderNo, HandleGetOrderByOrderNoAsync)
            .WithTags(ApiRoutes.Order.Tags)
            .WithName(nameof(GetOrderByOrderNo))
            .Produces<ApiGetResponse<GetOrderByOrderNoResult>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<GetOrderByOrderNoResult>> HandleGetOrderByOrderNoAsync(
        ISender sender,
        [FromRoute] string orderNo)
    {
        var query = new GetOrderByOrderNoQuery(orderNo);
        var result = await sender.Send(query);

        return new ApiGetResponse<GetOrderByOrderNoResult>(result);
    }

    #endregion
}