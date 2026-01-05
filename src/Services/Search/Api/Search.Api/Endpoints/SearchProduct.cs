#region using

using BuildingBlocks.Pagination;
using Common.Models.Reponses;
using Search.Api.Constants;
using Search.Application.Features.Product.Queries;
using Search.Application.Models.Filters;
using Search.Application.Models.Results;
using Search.Domain.Enums;

#endregion

namespace Search.Api.Endpoints;

public sealed class SearchProduct : ICarterModule
{
    #region Implementations

    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet(ApiRoutes.Product.Search, HandleSearchProductAsync)
            .WithTags(ApiRoutes.Product.Tags)
            .WithName(nameof(SearchProduct))
            .Produces<ApiGetResponse<SearchProductResult>>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest);
    }

    #endregion

    #region Methods

    private async Task<ApiGetResponse<SearchProductResult>> HandleSearchProductAsync(
        ISender sender,
        [AsParameters] PaginationRequest paging,
        string? searchText = null,
        string? categories = null,
        decimal? minPrice = null,
        decimal? maxPrice = null,
        ProductStatus? status = null,
        SortBy? sortBy = null,
        SortType? sortType = null)
    {
        var filter = new SearchTermsFilter(
            SearchText: searchText,
            Categories: categories ?? string.Empty,
            MinPrice: minPrice,
            MaxPrice: maxPrice,
            Status: status,
            SortBy: sortBy,
            SortType: sortType);

        var query = new SearchProductQuery(filter, paging);
        var result = await sender.Send(query);

        return new ApiGetResponse<SearchProductResult>(result);
    }

    #endregion
}
