#region using

using Basket.Application.Dtos.Products;
using Common.Models.Reponses;

#endregion

namespace Basket.Application.Models.Results;

public sealed class GetProductsResult
{
    #region Fields, Properties and Indexers

    public List<ProductDto> Items { get; init; }

    public PagingResult Paging { get; init; }

    #endregion

    #region Ctors

    public GetProductsResult(
        List<ProductDto> items, 
        long totalCount, 
        PaginationRequest pagination)
    {
        Items = items;
        Paging = PagingResult.Of(totalCount, pagination);
    }

    #endregion
}
