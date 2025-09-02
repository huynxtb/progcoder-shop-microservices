#region using

using Inventory.Application.Dtos.Products;
using Common.Models.Reponses;

#endregion

namespace Inventory.Application.Services;

public interface ICatalogApiService
{
    #region Methods

    Task<ResultSharedResponse<ProductApiDto>?> GetProductByIdAsync(string productId);

    #endregion
}
