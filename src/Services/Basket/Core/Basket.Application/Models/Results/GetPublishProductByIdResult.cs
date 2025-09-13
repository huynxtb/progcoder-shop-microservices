#region using

using Basket.Application.Dtos.Products;

#endregion

namespace Basket.Application.Models.Results;

public sealed class GetPublishProductByIdResult
{
    #region Fields, Properties and Indexers

    public PublishProductDto Product { get; init; }

    #endregion

    #region Ctors

    public GetPublishProductByIdResult(PublishProductDto product)
    {
        Product = product;
    }

    #endregion
}
