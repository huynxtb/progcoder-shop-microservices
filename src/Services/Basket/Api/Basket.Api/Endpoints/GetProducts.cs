#region using

using BuildingBlocks.Pagination;
using Basket.Api.Constants;
using Basket.Application.CQRS.Product.Queries;
using Basket.Application.Models.Filters;
using Basket.Application.Models.Results;
using Common.Models.Reponses;

#endregion

namespace Basket.Api.Endpoints;

public sealed class GetProducts : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Product.GetProducts, HandleGetProductsAsync)
            .WithTags(ApiRoutes.Product.Tags)
            .WithName(nameof(GetProducts))
            .Produces<GetProductsResult>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<GetProductsResult> HandleGetProductsAsync(
        ISender sender,
        [AsParameters] GetProductsFilter req,
        [AsParameters] PaginationRequest paging)
    {
        var query = new GetProductsQuery(req, paging);

        return await sender.Send(query);
    }

    #endregion
}
