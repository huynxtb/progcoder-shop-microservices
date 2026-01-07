#region using

using Catalog.Api.Constants;
using Catalog.Application.Features.Product.Queries;
using Catalog.Application.Models.Filters;
using Catalog.Application.Models.Results;

#endregion

namespace Catalog.Api.Endpoints;

public sealed class GetAllProducts : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Product.GetAllProducts, HandleGetAllProductsAsync)
            .WithTags(ApiRoutes.Product.Tags)
            .WithName(nameof(GetAllProducts))
            .Produces<ApiGetResponse<GetAllProductsResult>>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status403Forbidden)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .RequireAuthorization();
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<GetAllProductsResult>> HandleGetAllProductsAsync(
        ISender sender,
        [AsParameters] GetAllProductsFilter req)
    {
        var query = new GetAllProductsQuery(req);
        var result = await sender.Send(query);

        return new ApiGetResponse<GetAllProductsResult>(result);
    }

    #endregion
}
