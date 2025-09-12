#region using

using BuildingBlocks.Pagination;
using Catalog.Api.Constants;
using Catalog.Application.CQRS.Product.Queries;
using Catalog.Application.Models.Filters;
using Catalog.Application.Models.Results;
using Common.Models.Reponses;

#endregion

namespace Catalog.Api.Endpoints;

public sealed class GetPublishProducts : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Product.GetPublishProducts, HandleGetPublishProductsAsync)
            .WithTags(ApiRoutes.Product.Tags)
            .WithName(nameof(GetPublishProducts))
            .Produces<ResultSharedResponse<GetPublishProductsResult>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound);
    }

    #endregion

    #region Methods

    private async Task<GetPublishProductsResult> HandleGetPublishProductsAsync(
        ISender sender,
        [AsParameters] GetPublishProductsFilter req,
        [AsParameters] PaginationRequest paging)
    {
        var query = new GetPublishProductsQuery(req, paging);

        return await sender.Send(query);
    }

    #endregion
}
