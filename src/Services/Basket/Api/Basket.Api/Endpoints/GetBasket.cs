#region using

using Basket.Api.Constants;
using Basket.Application.Models.Results;
using Basket.Application.CQRS.Basket.Queries;
using BuildingBlocks.Authentication.Extensions;

#endregion

namespace Basket.Api.Endpoints;

public sealed class GetBasket : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Basket.GetBasket, HandleGetBasketAsync)
            .WithTags(ApiRoutes.Basket.Tags)
            .WithName(nameof(GetBasket))
            .Produces<ApiGetResponse<GetBasketResult>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<GetBasketResult>> HandleGetBasketAsync(
        ISender sender,
        IHttpContextAccessor httpContext)
    {
        var currentUser = httpContext.GetCurrentUser();
        var query = new GetBasketQuery(currentUser.Id);
        var result = await sender.Send(query);

        return new ApiGetResponse<GetBasketResult>(result);
    }

    #endregion
}
