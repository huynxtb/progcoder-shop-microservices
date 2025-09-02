#region using

using Inventory.Application.Dtos.Products;
using Refit;
using Common.Models.Reponses;

#endregion

namespace Inventory.Infrastructure.ApiClients;

public interface ICatalogApi
{
    #region Methods

    [Get("/products/{productId}")]
    Task<ResultSharedResponse<ProductApiDto>?> GetProductByIdAsync(
        [AliasAs("productId")] string productId,
        [Header("Authorization")] string bearerToken);

    #endregion
}
