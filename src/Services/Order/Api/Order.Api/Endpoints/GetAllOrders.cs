#region using

using Common.Models.Reponses;
using Order.Api.Constants;
using Order.Application.Features.Order.Queries;
using Order.Application.Models.Filters;
using Order.Application.Models.Results;

#endregion

namespace Order.Api.Endpoints;

public sealed class GetAllOrders : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Order.GetAllOrders, HandleGetAllOrdersAsync)
            .WithTags(ApiRoutes.Order.Tags)
            .WithName(nameof(GetAllOrders))
            .Produces<ApiGetResponse<GetAllOrdersResult>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<GetAllOrdersResult>> HandleGetAllOrdersAsync(
        ISender sender,
        [AsParameters] GetAllOrdersFilter filter)
    {
        var query = new GetAllOrdersQuery(filter);
        var result = await sender.Send(query);

        return new ApiGetResponse<GetAllOrdersResult>(result);
    }

    #endregion
}