#region using

using Inventory.Application.Dtos.Products;

#endregion

namespace Inventory.Application.Services;

public interface ICatalogApiService
{
    #region Methods

    Task<ProductApiDto> GetProductByIdAsync(string productId);

    #endregion
}
