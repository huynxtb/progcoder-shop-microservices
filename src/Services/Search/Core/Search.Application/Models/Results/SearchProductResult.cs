#region using

using BuildingBlocks.Pagination;
using Search.Application.Dtos.Products;

#endregion

namespace Search.Application.Models.Results;

public sealed class SearchProductResult
{
    #region Fields, Properties and Indexers

    public List<ProductDto> Products { get; init; }

    public PagingResult Paging { get; init; }

    #endregion

    #region Ctors

    public SearchProductResult(
        List<ProductDto> products,
        long totalCount,
        PaginationRequest pagination)
    {
        Products = products;
        Paging = PagingResult.Of(totalCount, pagination);
    }

    #endregion
}

