#region using

using BuildingBlocks.Pagination;
using Order.Api.Constants;
using Order.Application.CQRS.Order.Queries;
using Order.Application.Models.Filters;
using Order.Application.Models.Results;
using BuildingBlocks.Abstractions.ValueObjects;
using BuildingBlocks.Authentication.Extensions;

#endregion

namespace Order.Api.Endpoints;

public sealed class GetOrdersByCurrentUser : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Order.GetOrdersByCurrentUser, HandleGetOrdersByCurrentUserAsync)
            .WithTags(ApiRoutes.Order.Tags)
            .WithName(nameof(GetOrdersByCurrentUser))
            .Produces<GetOrdersByCurrentUserResult>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<GetOrdersByCurrentUserResult> HandleGetOrdersByCurrentUserAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [AsParameters] GetOrdersByCurrentUserFilter filter,
        [AsParameters] PaginationRequest paging)
    {
        var currentUser = httpContext.GetCurrentUser();
        var query = new GetOrdersByCurrentUserQuery(filter, paging, Actor.User(currentUser.Id));

        return await sender.Send(query);
    }

    #endregion
}
