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

public sealed record GetPublishProductsQuery(
    GetPublishProductsFilter Filter,
    PaginationRequest Paging) : IQuery<GetPublishProductsResult>;

public sealed class GetPublishProductsQueryHandler(IDocumentSession session, IMapper mapper)
    : IQueryHandler<GetPublishProductsQuery, GetPublishProductsResult>
{
    #region Implementations

    public async Task<GetPublishProductsResult> Handle(GetPublishProductsQuery query, CancellationToken cancellationToken)
    {
        var filter = query.Filter;
        var paging = query.Paging;
        var productQuery = session.Query<ProductEntity>().Where(x => x.Published);

        if (!filter.SearchText.IsNullOrWhiteSpace())
        {
            var search = filter.SearchText.Trim();
            productQuery = productQuery.Where(x => x.Name != null && x.Name.Contains(search));
        }

        var totalCount = await productQuery.CountAsync(cancellationToken);
        var result = await productQuery
            .OrderByDescending(x => x.CreatedOnUtc)
            .ToPagedListAsync(paging.PageNumber, paging.PageSize, cancellationToken);

        var products = result.ToList();
        var items = mapper.Map<List<PublishProductDto>>(products);
        var reponse = new GetPublishProductsResult(items, totalCount, paging);

        return reponse;
    }

    #endregion
}