#region using

using Catalog.Api.Constants;
using Catalog.Application.CQRS.Category.Queries;
using Catalog.Application.Models.Filters;
using Catalog.Application.Models.Responses;
using SourceCommon.Models.Reponses;

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
            .Produces<ResultSharedResponse<GetAllCategoriesResponse>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status404NotFound);
    }

    #endregion

    #region Methods

    private async Task<ResultSharedResponse<GetAllCategoriesResponse>> HandleGetAllCategoriesAsync(
        ISender sender,
        [AsParameters] GetAllCategoriesFilter req)
    {
        var query = new GetAllCategoriesQuery(req);

        return await sender.Send(query);
    }

    #endregion
}
