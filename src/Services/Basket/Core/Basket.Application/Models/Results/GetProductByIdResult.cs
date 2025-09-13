#region using

using Basket.Application.Dtos.Categories;
using Basket.Application.Dtos.Products;

#endregion

namespace Basket.Application.Models.Results;

public sealed class GetProductByIdResult
{
    #region Fields, Properties and Indexers

    public ProductDto Product { get; init; }

    #endregion

    #region Ctors

    public GetProductByIdResult(ProductDto product)
    {
        Product = product;
    }

    #endregion
}
