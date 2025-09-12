#region using

using Catalog.Application.Dtos.Categories;
using Catalog.Application.Dtos.Products;

#endregion

namespace Catalog.Application.Models.Results;

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
