#region using

using Catalog.Api.Constants;
using Catalog.Application.Features.Category.Queries;
using Catalog.Application.Models.Filters;
using Catalog.Application.Models.Results;
using Common.Models.Reponses;

#endregion

namespace Catalog.Api.Endpoints;

public sealed class GetAllCategories : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Category.GetAll, HandleGetAllCategoriesAsync)
            .WithTags(ApiRoutes.Category.Tags)
            .WithName(nameof(GetAllCategories))
            .Produces<ApiGetResponse<GetAllCategoriesResult>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest);
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<GetAllCategoriesResult>> HandleGetAllCategoriesAsync(
        ISender sender,
        [AsParameters] GetAllCategoriesFilter req)
    {
        var query = new GetAllCategoriesQuery(req);
        var result = await sender.Send(query);

        return new ApiGetResponse<GetAllCategoriesResult>(result);
    }

    #endregion
}
