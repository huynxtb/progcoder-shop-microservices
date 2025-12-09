#region using

using BuildingBlocks.Pagination;
using Common.Models.Reponses;
using Order.Api.Constants;
using Order.Application.CQRS.Order.Queries;
using Order.Application.Models.Filters;
using Order.Application.Models.Results;

#endregion

namespace Order.Api.Endpoints;

public sealed class GetOrders : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Order.GetOrders, HandleGetOrdersAsync)
            .WithTags(ApiRoutes.Order.Tags)
            .WithName(nameof(GetOrders))
            .Produces<ApiGetResponse<GetOrdersResult>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<GetOrdersResult>> HandleGetOrdersAsync(
        ISender sender,
        [AsParameters] GetOrdersFilter filter,
        [AsParameters] PaginationRequest paging)
    {
        var query = new GetOrdersQuery(filter, paging);
        var result = await sender.Send(query);

        return new ApiGetResponse<GetOrdersResult>(result);
    }

    #endregion
}
