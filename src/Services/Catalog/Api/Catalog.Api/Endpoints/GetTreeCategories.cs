#region using

using Catalog.Api.Constants;
using Catalog.Application.Features.Category.Queries;
using Catalog.Application.Models.Results;
using Common.Models.Reponses;

#endregion

namespace Catalog.Api.Endpoints;

public sealed class GetTreeCategories : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Category.GetTree, HandleGetTreeCategoriesAsync)
            .WithTags(ApiRoutes.Category.Tags)
            .WithName(nameof(GetTreeCategories))
            .Produces<ApiGetResponse<GetTreeCategoriesResult>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound);
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<GetTreeCategoriesResult>> HandleGetTreeCategoriesAsync(ISender sender)
    {
        var query = new GetTreeCategoriesQuery();
        var result = await sender.Send(query);

        return new ApiGetResponse<GetTreeCategoriesResult>(result);
    }

    #endregion
}
