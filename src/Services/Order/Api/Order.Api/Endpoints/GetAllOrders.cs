#region using

using Order.Api.Constants;
using Order.Application.CQRS.Order.Queries;
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
            .Produces<GetAllOrdersResult>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<GetAllOrdersResult> HandleGetAllOrdersAsync(
        ISender sender,
        [AsParameters] GetAllOrdersFilter filter)
    {
        var query = new GetAllOrdersQuery(filter);

        return await sender.Send(query);
    }

    #endregion
}