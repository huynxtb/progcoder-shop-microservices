#region using

using Inventory.Application.Models.Responses.Externals;

#endregion

namespace Inventory.Application.Services;

public interface ICatalogApiService
{
    #region Methods

    Task<GetProductByIdReponse?> GetProductByIdAsync(string productId);

    #endregion
}
