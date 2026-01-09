#region using

using BuildingBlocks.Pagination;
using BuildingBlocks.Authentication.Extensions;
using Common.Models.Reponses;
using Order.Api.Constants;
using Order.Application.Features.Order.Queries;
using Order.Application.Models.Filters;
using Order.Application.Models.Results;
using Common.Models;

#endregion

namespace Order.Api.Endpoints;

public sealed class GetMyOrders : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Order.GetOrdersByCurrentUser, HandleGetMyOrdersAsync)
            .WithTags(ApiRoutes.Order.Tags)
            .WithName(nameof(GetMyOrders))
            .Produces<ApiGetResponse<GetMyOrdersResult>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<GetMyOrdersResult>> HandleGetMyOrdersAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [AsParameters] GetMyOrdersFilter filter,
        [AsParameters] PaginationRequest paging)
    {
        var currentUser = httpContext.GetCurrentUser();
        var query = new GetMyOrdersQuery(filter, paging, Actor.User(currentUser.Id));
        var result = await sender.Send(query);

        return new ApiGetResponse<GetMyOrdersResult>(result);
    }

    #endregion
}
