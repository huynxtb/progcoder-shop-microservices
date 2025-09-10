#region using

using Order.Application.Models.Responses.Externals;

#endregion

namespace Order.Application.Services;

public interface ICatalogGrpcService
{
	#region Methods

	Task<ProductReponse?> GetProductByIdAsync(string productId, CancellationToken cancellationToken = default);

    #endregion
}
