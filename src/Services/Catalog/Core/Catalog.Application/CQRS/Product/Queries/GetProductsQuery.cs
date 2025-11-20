#region using

using AutoMapper;
using Catalog.Application.Dtos.Products;
using Catalog.Application.Models.Filters;
using Catalog.Application.Models.Results;
using Catalog.Domain.Entities;
using Marten;
using Marten.Pagination;

#endregion

namespace Catalog.Application.CQRS.Product.Queries;

public sealed record GetProductsQuery(
    GetProductsFilter Filter,
    PaginationRequest Paging) : IQuery<GetProductsResult>;

public sealed class GetProductsQueryHandler(IDocumentSession session, IMapper mapper)
    : IQueryHandler<GetProductsQuery, GetProductsResult>
{
    #region Implementations

    public async Task<GetProductsResult> Handle(GetProductsQuery query, CancellationToken cancellationToken)
    {
        var filter = query.Filter;
        var paging = query.Paging;
        var productQuery = session.Query<ProductEntity>().AsQueryable();

        if (!filter.SearchText.IsNullOrWhiteSpace())
        {
            var search = filter.SearchText.Trim();
            productQuery = productQuery.Where(x => x.Name != null && x.Name.Contains(search));
        }
        if (filter.Ids?.Length > 0)
        {
            productQuery = productQuery.Where(x => filter.Ids.Contains(x.Id));
        }

        var totalCount = await productQuery.CountAsync(cancellationToken);
        var result = await productQuery
            .OrderByDescending(x => x.CreatedOnUtc)
            .ToPagedListAsync(paging.PageNumber, paging.PageSize, cancellationToken);
        
        var products = result.ToList();
        var items = mapper.Map<List<ProductDto>>(products);
        var reponse = new GetProductsResult(items, totalCount, paging);

        return reponse;
    }

    #endregion
}