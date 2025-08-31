#region using

using Inventory.Application.Dtos.Products;
using Refit;

#endregion

namespace Inventory.Infrastructure.ApiClients;

public interface ICatalogApi
{
    #region Methods

    [Get("/products/{productId}")]
    Task<ProductApiDto> GetProductByIdAsync(
        [AliasAs("productId")] string productId,
        [Header("Authorization")] string bearerToken);

    #endregion
}
