#region using

using Basket.Api.Constants;
using Basket.Application.CQRS.Product.Queries;
using Basket.Application.Models.Filters;
using Basket.Application.Models.Results;

#endregion

namespace Basket.Api.Endpoints;

public sealed class GetAllProducts : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Product.GetAllProducts, HandleGetAllProductsAsync)
            .WithTags(ApiRoutes.Product.Tags)
            .WithName(nameof(GetAllProducts))
            .Produces<GetAllProductsResult>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<GetAllProductsResult> HandleGetAllProductsAsync(
        ISender sender,
        [AsParameters] GetAllProductsFilter req)
    {
        var query = new GetAllProductsQuery(req);

        return await sender.Send(query);
    }

    #endregion
}
