#region using

using BuildingBlocks.Pagination;
using Catalog.Api.Constants;
using Catalog.Application.Features.Product.Queries;
using Catalog.Application.Models.Filters;
using Catalog.Application.Models.Results;
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
            .Produces<ApiGetResponse<GetProductsResult>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<GetProductsResult>> HandleGetProductsAsync(
        ISender sender,
        [AsParameters] GetProductsFilter req,
        [AsParameters] PaginationRequest paging)
    {
        var query = new GetProductsQuery(req, paging);
        var result = await sender.Send(query);

        return new ApiGetResponse<GetProductsResult>(result);
    }

    #endregion
}
