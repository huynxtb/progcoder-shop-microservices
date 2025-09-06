#region using

using Order.Application.Dtos.Products;
using Refit;
using Common.Models.Reponses;

#endregion

namespace Order.Infrastructure.ApiClients;

public interface ICatalogApi
{
    #region Methods

    [Get("/products/{productId}")]
    Task<ResultSharedResponse<ProductApiDto>?> GetProductByIdAsync(
        [AliasAs("productId")] string productId,
        [Header("Authorization")] string bearerToken);

    #endregion
}
