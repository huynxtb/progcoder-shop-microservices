#region using

using Catalog.Application.Dtos.Products;
using Common.Models.Reponses;

#endregion

namespace Catalog.Application.Models.Results;

public sealed class GetProductsResult
{
    #region Fields, Properties and Indexers

    public List<ProductDto> Items { get; init; }

    public PagingResult Paging { get; init; }

    #endregion

    #region Ctors

    public GetProductsResult(
        List<ProductDto> items, 
        long totalItems, 
        int pageNumber, 
        int pageSize)
    {
        Items = items;
        Paging = PagingResult.Of(totalItems, pageNumber, pageSize);
    }

    #endregion
}
