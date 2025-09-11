#region using

using Catalog.Application.Dtos.Products;
using Catalog.Application.Models.Filters;
using Catalog.Application.Models.Responses;
using Catalog.Domain.Entities;
using Marten;

#endregion

namespace Catalog.Application.CQRS.Product.Queries;

public sealed record GetAllProductsQuery(GetAllProductsFilter Filter) : IQuery<GetAllProductsResponse>;

public sealed class GetAllProductsQueryHandler(IDocumentSession session)
    : IQueryHandler<GetAllProductsQuery, GetAllProductsResponse>
{
    #region Implementations

    public async Task<GetAllProductsResponse> Handle(GetAllProductsQuery query, CancellationToken cancellationToken)
    {
        var filter = query.Filter;
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

        var result = await productQuery
            .OrderByDescending(x => x.CreatedOnUtc)
            .ToListAsync(cancellationToken);
        
        var items = result.Adapt<List<ProductDto>>();
        var response = new GetAllProductsResponse(items);

        return response;
    }

    #endregion
}