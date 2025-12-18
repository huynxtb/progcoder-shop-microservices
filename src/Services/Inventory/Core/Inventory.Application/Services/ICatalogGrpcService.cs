#region using

using Inventory.Application.Models.Responses.Externals;
using Inventory.Application.Models.Responses.Internals;

#endregion

namespace Inventory.Application.Services;

public interface ICatalogGrpcService
{
	#region Methods

	Task<GetProductByIdReponse?> GetProductByIdAsync(string productId, CancellationToken cancellationToken = default);

    Task<GetAllProductsResponse?> GetProductsAsync(string[]? ids = null, string searchText = "", CancellationToken cancellationToken = default);

    #endregion
}
