#region using

using Catalog.Application.Dtos.Products;
using Catalog.Application.Models.Responses;
using Catalog.Domain.Entities;
using Marten;
using Marten.Pagination;
using SourceCommon.Models.Reponses;

#endregion

namespace Catalog.Application.CQRS.Product.Queries;

public record class GetPublishProductsFilter(string? SearchText);

public sealed record GetPublishProductsQuery(
    GetPublishProductsFilter Filter,
    PaginationRequest Paging) : IQuery<ResultSharedResponse<GetPublishProductsResponse>>;

public sealed class GetPublishProductsQueryHandler(IDocumentSession session)
    : IQueryHandler<GetPublishProductsQuery, ResultSharedResponse<GetPublishProductsResponse>>
{
    #region Implementations

    public async Task<ResultSharedResponse<GetPublishProductsResponse>> Handle(GetPublishProductsQuery query, CancellationToken cancellationToken)
    {
        var filter = query.Filter;
        var paging = query.Paging;
        var productQuery = session.Query<ProductEntity>().Where(x => x.Published);

        if (!filter.SearchText.IsNullOrWhiteSpace())
        {
            var search = filter.SearchText.Trim();
            productQuery = productQuery.Where(x => x.Name != null && x.Name.Contains(search));
        }

        var result = await productQuery
            .OrderByDescending(x => x.CreatedOnUtc)
            .ToPagedListAsync(paging.PageNumber, paging.PageSize, cancellationToken);
        var products = result.ToList();

        var reponse = new GetPublishProductsResponse()
        {
            Items = products.Adapt<List<PublishProductDto>>(),
            Paging = new()
            {
                Total = result.TotalItemCount,
                PageNumber = paging.PageNumber,
                PageSize = paging.PageSize,
                HasItem = result.HasNextPage,
                TotalPages = result.PageCount,
                HasNextPage = result.HasNextPage,
                HasPreviousPage = result.HasPreviousPage
            }
        };

        return ResultSharedResponse<GetPublishProductsResponse>.Success(reponse, MessageCode.GetSuccess);
    }

    #endregion
}