#region using

using Common.Models.Reponses;
using Inventory.Application.Models.Responses.Externals;
using Refit;

#endregion

namespace Inventory.Infrastructure.ApiClients;

public interface ICatalogApi
{
    #region Methods

    [Get("/admin/products/{productId}")]
    Task<ApiGetResponse<GetProductByIdReponse>> GetProductByIdAsync([AliasAs("productId")] string productId, [Header("Authorization")] string bearerToken);

    #endregion
}
