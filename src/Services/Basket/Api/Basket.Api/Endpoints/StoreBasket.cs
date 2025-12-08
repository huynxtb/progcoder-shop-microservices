#region using

using Basket.Api.Constants;
using Microsoft.AspNetCore.Mvc;
using Basket.Application.Dtos.Baskets;
using Basket.Application.CQRS.Basket.Commands;
using BuildingBlocks.Authentication.Extensions;

#endregion

namespace Basket.Api.Endpoints;

public sealed class StoreBasket : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost(ApiRoutes.Basket.StoreBasket, HandleStoreBasketAsync)
            .WithTags(ApiRoutes.Basket.Tags)
            .WithName(nameof(StoreBasket))
            .Produces<ApiCreatedResponse<Guid>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .DisableAntiforgery()
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiCreatedResponse<Guid>> HandleStoreBasketAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [FromBody] StoreShoppingCartDto dto)
    {
        var currentUser = httpContext.GetCurrentUser();
        var command = new StoreBasketCommand(currentUser.Id, dto);
        var result = await sender.Send(command);

        return new ApiCreatedResponse<Guid>(result);
    }

    #endregion
}
