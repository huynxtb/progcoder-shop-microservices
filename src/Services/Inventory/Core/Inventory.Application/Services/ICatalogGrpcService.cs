#region using

using Inventory.Application.Models.Responses.Externals;

#endregion

namespace Inventory.Application.Services;

public interface ICatalogGrpcService
{
	#region Methods

	Task<ProductReponse?> GetProductByIdAsync(string productId, CancellationToken cancellationToken = default);

    #endregion
}
