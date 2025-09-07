#region using

using BuildingBlocks.Pagination;
using Catalog.Api.Constants;
using Catalog.Application.CQRS.Product.Queries;
using Catalog.Application.Models.Filters;
using Catalog.Application.Models.Responses;
using Common.Models.Reponses;

#endregion

namespace Catalog.Api.Endpoints;

public sealed class GetProducts : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Product.GetProducts, HandleGetProductsAsync)
            .WithTags(ApiRoutes.Product.Tags)
            .WithName(nameof(GetProducts))
            .Produces<GetProductsResponse>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<GetProductsResponse> HandleGetProductsAsync(
        ISender sender,
        [AsParameters] GetProductsFilter req,
        [AsParameters] PaginationRequest paging)
    {
        var query = new GetProductsQuery(req, paging);

        return await sender.Send(query);
    }

    #endregion
}
