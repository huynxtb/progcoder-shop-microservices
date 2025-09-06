#region using

using Order.Application.Dtos.Products;
using Common.Models.Reponses;

#endregion

namespace Order.Application.Services;

public interface ICatalogApiService
{
    #region Methods

    Task<ResultSharedResponse<ProductApiDto>?> GetProductByIdAsync(string productId);

    #endregion
}
