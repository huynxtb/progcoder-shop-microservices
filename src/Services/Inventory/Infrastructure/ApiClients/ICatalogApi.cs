#region using

using Inventory.Application.Models.Responses.Externals;
using Refit;

#endregion

namespace Inventory.Infrastructure.ApiClients;

public interface ICatalogApi
{
    #region Methods

    [Get("/products/{productId}")]
    Task<ProductReponse> GetProductByIdAsync([AliasAs("productId")] string productId, [Header("Authorization")] string bearerToken);

    #endregion
}
