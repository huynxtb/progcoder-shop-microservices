#region using

using BuildingBlocks.Authentication.Extensions;
using Order.Api.Constants;
using Order.Application.Features.Order.Queries;
using Order.Application.Models.Filters;
using Order.Application.Models.Results;

#endregion

namespace Order.Api.Endpoints;

public sealed class GetAllMyOrders : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Order.GetAllMyOrders, HandleGetAllMyOrdersAsync)
            .WithTags(ApiRoutes.Order.Tags)
            .WithName(nameof(GetAllMyOrders))
            .Produces<ApiGetResponse<GetAllMyOrdersResult>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<GetAllMyOrdersResult>> HandleGetAllMyOrdersAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [AsParameters] GetMyOrdersFilter filter)
    {
        var currentUser = httpContext.GetCurrentUser();
        var query = new GetAllMyOrdersQuery(filter, Actor.User(currentUser.Id));
        var result = await sender.Send(query);

        return new ApiGetResponse<GetAllMyOrdersResult>(result);
    }

    #endregion
}
