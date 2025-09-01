#region using

using Inventory.Application.Dtos.Products;
using SourceCommon.Models.Reponses;

#endregion

namespace Inventory.Application.Services;

public interface ICatalogApiService
{
    #region Methods

    Task<ResultSharedResponse<ProductApiDto>?> GetProductByIdAsync(string productId);

    #endregion
}
