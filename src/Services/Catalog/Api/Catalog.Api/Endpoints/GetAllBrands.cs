#region using

using Catalog.Api.Constants;
using Catalog.Application.Features.Brand.Queries;
using Catalog.Application.Models.Results;

#endregion

namespace Catalog.Api.Endpoints;

public sealed class GetAllBrands : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Brand.GetAll, HandleGetAllBrandsAsync)
            .WithTags(ApiRoutes.Brand.Tags)
            .WithName(nameof(GetAllBrands))
            .Produces<ApiGetResponse<GetAllBrandsResult>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest);
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<GetAllBrandsResult>> HandleGetAllBrandsAsync(ISender sender)
    {
        var query = new GetAllBrandsQuery();
        var result = await sender.Send(query);

        return new ApiGetResponse<GetAllBrandsResult>(result);
    }

    #endregion
}
