#region using

using Basket.Api.Constants;
using Basket.Application.CQRS.Basket.Commands;
using Basket.Application.Dtos.Baskets;
using BuildingBlocks.Authentication.Extensions;
using Microsoft.AspNetCore.Mvc;

#endregion

namespace Basket.Api.Endpoints;

public sealed class BasketCheckout : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost(ApiRoutes.Basket.CheckoutBasket, HandleBasketCheckoutAsync)
            .WithTags(ApiRoutes.Basket.Tags)
            .WithName(nameof(BasketCheckout))
            .Produces<ApiCreatedResponse<Guid>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status401Unauthorized)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .DisableAntiforgery()
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiCreatedResponse<Guid>> HandleBasketCheckoutAsync(
        ISender sender,
        IHttpContextAccessor httpContext,
        [FromBody] BasketCheckoutDto dto)
    {
        var currentUser = httpContext.GetCurrentUser();
        var command = new BasketCheckoutCommand(currentUser.Id, dto);
        var result = await sender.Send(command);

        return new ApiCreatedResponse<Guid>(result);
    }

    #endregion
}

