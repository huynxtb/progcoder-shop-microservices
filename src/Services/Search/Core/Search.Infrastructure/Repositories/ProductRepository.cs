#region using

using BuildingBlocks.Pagination;
using Common.Extensions;
using Common.Models;
using Elasticsearch.Net;
using Nest;
using Search.Application.Models.Filters;
using Search.Application.Repositories;
using Search.Domain.Entities;
using Search.Domain.Enums;

#endregion

namespace Search.Infrastructure.Repositories;

public class ProductRepository(IElasticClient elasticClient) : IProductRepository
{

    #region Fields, Properties and Indexers

    private readonly string _index = ElasticIndex.Products.GetDescription();

    #endregion

    #region Implementations

    public async Task<bool> DeleteAsync(string productId, CancellationToken cancellationToken = default)
    {
        var result = await elasticClient.DeleteAsync<ProductEntity>(productId, i => i
            .Index(_index)
            .Refresh(Refresh.True));

        return result.IsValid && result.Result == Result.Deleted;
    }

    public async Task<(List<ProductEntity> Items, long TotalCount)> SearchAsync(
        SearchTermsFilter filter,
        PaginationRequest? paging = null,
        CancellationToken cancellationToken = default)
    {
        var searchDescriptor = new SearchDescriptor<ProductEntity>()
            .Index(_index)
            .Query(q => BuildQuery(q, filter));

        ApplySorting(searchDescriptor, filter);

        // Apply pagination if provided
        if (paging != null)
        {
            var pageNumber = paging.PageNumber <= 0 ? 1 : paging.PageNumber;
            var pageSize = paging.PageSize <= 0 ? 10 : paging.PageSize;
            var skip = (pageNumber - 1) * pageSize;

            searchDescriptor = searchDescriptor
                .From(skip)
                .Size(pageSize);
        }

        var searchResponse = await elasticClient.SearchAsync<ProductEntity>(searchDescriptor, cancellationToken);

        if (!searchResponse.IsValid) return ([], 0);

        var totalCount = searchResponse.Total;
        var items = searchResponse.Documents.ToList();

        return (items, totalCount);
    }

    public async Task<bool> UpsertAsync(ProductEntity product, CancellationToken cancellationToken = default)
    {
        var result = await elasticClient.IndexAsync(product, i => i
            .Index(_index)
            .Id(product.Id)
            .Refresh(Refresh.True));

        return result.IsValid && (result.Result == Result.Created || result.Result == Result.Updated);
    }

    #endregion

    #region Methods

    private static QueryContainer BuildQuery(QueryContainerDescriptor<ProductEntity> q, SearchTermsFilter filter)
    {
        var mustClauses = new List<QueryContainer>();

        // Search by text in Name field
        if (!filter.SearchText.IsNullOrWhiteSpace())
        {
            mustClauses.Add(q.Match(m => m
                .Field(f => f.Name)
                .Query(filter.SearchText!)
                .Fuzziness(Fuzziness.Auto)
                .Operator(Operator.Or)));
        }

        // Filter by categories
        if (!filter.Categories.IsNullOrWhiteSpace())
        {
            var categoryList = filter.Categories
                .Split(",", StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                .ToList();

            if (categoryList.Any())
            {
                mustClauses.Add(q.Terms(t => t
                .Field(f => f.Categories.Suffix("keyword"))
                .Terms(categoryList)));
            }
        }

        // Filter by price range
        if (filter.MinPrice.HasValue || filter.MaxPrice.HasValue)
        {
            mustClauses.Add(q.Range(r =>
            {
                var range = r.Field(f => f.Price);

                if (filter.MinPrice.HasValue)
                {
                    range = range.GreaterThanOrEquals((double)filter.MinPrice.Value);
                }

                if (filter.MaxPrice.HasValue)
                {
                    range = range.LessThanOrEquals((double)filter.MaxPrice.Value);
                }

                return range;
            }));
        }

        // Filter by status
        if (filter.Status.HasValue)
        {
            mustClauses.Add(q.Term(t => t
                .Field(f => f.Status)
                .Value((int)filter.Status.Value)));
        }

        // If no filters, return all documents
        return !mustClauses.Any()
            ? q.MatchAll()
            : q.Bool(b => b.Must(mustClauses.ToArray()));
    }

    private static void ApplySorting(SearchDescriptor<ProductEntity> searchDescriptor, SearchTermsFilter filter)
    {
        if (!filter.SortBy.HasValue)
        {
            return;
        }

        var sortType = filter.SortType ?? Domain.Enums.SortType.Asc;

        Func<SortDescriptor<ProductEntity>, IPromise<IList<ISort>>> sortSelector = filter.SortBy.Value switch
        {
            Domain.Enums.SortBy.Name => sortType == Domain.Enums.SortType.Asc
                ? sort => sort.Ascending(p => p.Name.Suffix("keyword"))
                : sort => sort.Descending(p => p.Name.Suffix("keyword")),
            Domain.Enums.SortBy.Sku => sortType == Domain.Enums.SortType.Asc
                ? sort => sort.Ascending(p => p.Sku.Suffix("keyword"))
                : sort => sort.Descending(p => p.Sku.Suffix("keyword")),
            Domain.Enums.SortBy.Price => sortType == Domain.Enums.SortType.Asc
                ? sort => sort.Ascending(p => p.Price)
                : sort => sort.Descending(p => p.Price),
            Domain.Enums.SortBy.SalePrice => sortType == Domain.Enums.SortType.Asc
                ? sort => sort.Ascending(p => p.SalePrice)
                : sort => sort.Descending(p => p.SalePrice),
            Domain.Enums.SortBy.Status => sortType == Domain.Enums.SortType.Asc
                ? sort => sort.Ascending(p => p.Status)
                : sort => sort.Descending(p => p.Status),
            Domain.Enums.SortBy.CreatedOnUtc => sortType == Domain.Enums.SortType.Asc
                ? sort => sort.Ascending(p => p.CreatedOnUtc)
                : sort => sort.Descending(p => p.CreatedOnUtc),
            _ => sort => sort.Ascending(p => p.Name.Suffix("keyword"))
        };

        searchDescriptor.Sort(sortSelector);
    }

    #endregion
}
