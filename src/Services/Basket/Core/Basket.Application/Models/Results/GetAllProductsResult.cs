#region using

using Basket.Application.Dtos.Products;

#endregion

namespace Basket.Application.Models.Results;

public sealed class GetAllProductsResult
{
    #region Fields, Properties and Indexers

    public List<ProductDto> Items { get; init; }

    #endregion

    #region Ctors

    public GetAllProductsResult(List<ProductDto> items)
    {
        Items = items;
    }

    #endregion
}
