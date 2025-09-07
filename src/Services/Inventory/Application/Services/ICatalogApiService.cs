#region using

using Inventory.Application.Models.Responses.Externals;

#endregion

namespace Inventory.Application.Services;

public interface ICatalogApiService
{
    #region Methods

    Task<ProductReponse?> GetProductByIdAsync(string productId);

    #endregion
}
