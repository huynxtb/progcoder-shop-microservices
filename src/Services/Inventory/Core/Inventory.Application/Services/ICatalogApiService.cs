#region using

using Common.Models.Reponses;
using Inventory.Application.Models.Responses.Externals;

#endregion

namespace Inventory.Application.Services;

public interface ICatalogApiService
{
    #region Methods

    Task<ApiGetResponse<GetProductByIdReponse>?> GetProductByIdAsync(string productId);

    #endregion
}
