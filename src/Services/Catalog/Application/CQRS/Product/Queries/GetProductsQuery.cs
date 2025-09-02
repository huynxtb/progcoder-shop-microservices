#region using

using Catalog.Application.Dtos.Products;
using Catalog.Application.Models.Filters;
using Catalog.Application.Models.Responses;
using Catalog.Domain.Entities;
using Marten;
using Marten.Pagination;
using Common.Models.Reponses;

#endregion

namespace Catalog.Application.CQRS.Product.Queries;

public sealed record GetProductsQuery(
    GetProductsFilter Filter,
    PaginationRequest Paging) : IQuery<ResultSharedResponse<GetProductsResponse>>;

public sealed class GetProductsQueryHandler(IDocumentSession session)
    : IQueryHandler<GetProductsQuery, ResultSharedResponse<GetProductsResponse>>
{
    #region Implementations

    public async Task<ResultSharedResponse<GetProductsResponse>> Handle(GetProductsQuery query, CancellationToken cancellationToken)
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

        var total = await productQuery.CountAsync(cancellationToken);
        var totalPages = (int)Math.Ceiling(total / (double)paging.PageSize);

        var result = await productQuery
            .OrderByDescending(x => x.CreatedOnUtc)
            .ToPagedListAsync(paging.PageNumber, paging.PageSize, cancellationToken);
        var products = result.ToList();

        var reponse = new GetProductsResponse()
        {
            Items = products.Adapt<List<ProductDto>>(),
            Paging = new()
            {
                Total = total,
                PageNumber = paging.PageNumber,
                PageSize = paging.PageSize,
                HasItem = products.Any(),
                TotalPages = totalPages,
                HasNextPage = paging.PageNumber < totalPages,
                HasPreviousPage = paging.PageNumber > 1
            }
        };

        return ResultSharedResponse<GetProductsResponse>.Success(reponse, MessageCode.GetSuccess);
    }

    #endregion
}