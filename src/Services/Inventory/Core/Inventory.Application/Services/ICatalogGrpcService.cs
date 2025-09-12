#region using

using Inventory.Application.Models.Responses.Externals;

#endregion

namespace Inventory.Application.Services;

public interface ICatalogGrpcService
{
	#region Methods

	Task<GetProductByIdReponse?> GetProductByIdAsync(string productId, CancellationToken cancellationToken = default);

    #endregion
}
