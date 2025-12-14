#region using

using Order.Application.Models.Responses.Externals;

#endregion

namespace Order.Application.Services;

public interface ICatalogGrpcService
{
	#region Methods

	Task<ProductReponse?> GetProductByIdAsync(string productId, CancellationToken cancellationToken = default);

    Task<GetAllProductsResponse?> GetProductsAsync(string[]? ids = null, string searchText = "", CancellationToken cancellationToken = default);

    Task<GetAllProductsResponse?> GetAllAvailableProductsAsync(string[]? ids = null, string searchText = "", CancellationToken cancellationToken = default);

    #endregion
}
