#region using

using AutoMapper;
using BuildingBlocks.Pagination;
using Search.Application.Dtos.Products;
using Search.Application.Models.Filters;
using Search.Application.Models.Results;
using Search.Application.Repositories;

#endregion

namespace Search.Application.Features.Product.Queries;

public sealed record SearchProductQuery(
    SearchTermsFilter Filter,
    PaginationRequest Paging) : IQuery<SearchProductResult>;

public sealed class SearchProductQueryHandler(
    IProductRepository productRepository,
    IMapper mapper) : IQueryHandler<SearchProductQuery, SearchProductResult>
{
    #region Implementations

    public async Task<SearchProductResult> Handle(SearchProductQuery query, CancellationToken cancellationToken)
    {
        var (products, totalCount) = await productRepository.SearchAsync(
            query.Filter, 
            query.Paging, 
            cancellationToken);

        var productDtos = mapper.Map<List<ProductDto>>(products);

        return new SearchProductResult(productDtos, totalCount, query.Paging);
    }

    #endregion
}