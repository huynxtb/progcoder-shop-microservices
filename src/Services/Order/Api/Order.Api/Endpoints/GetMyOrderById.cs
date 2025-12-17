#region using

using BuildingBlocks.Abstractions.ValueObjects;
using BuildingBlocks.Authentication.Extensions;
using Common.Models.Reponses;
using Order.Api.Constants;
using Order.Application.CQRS.Order.Queries;
using Order.Application.Models.Results;
using Microsoft.AspNetCore.Mvc;

#endregion

namespace Order.Api.Endpoints;

public sealed class GetMyOrderById : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Order.GetMyOrderById, HandleGetMyOrderByIdAsync)
            .WithTags(ApiRoutes.Order.Tags)
            .WithName(nameof(GetMyOrderById))
            .Produces<ApiGetResponse<GetMyOrderByIdResult>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<GetMyOrderByIdResult>> HandleGetMyOrderByIdAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [FromRoute] Guid orderId)
    {
        var currentUser = httpContext.GetCurrentUser();
        var query = new GetMyOrderByIdQuery(orderId, Actor.User(currentUser.Id));
        var result = await sender.Send(query);

        return new ApiGetResponse<GetMyOrderByIdResult>(result);
    }

    #endregion
}
