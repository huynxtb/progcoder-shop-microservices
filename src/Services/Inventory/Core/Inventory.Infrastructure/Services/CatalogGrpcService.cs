#region using

using Catalog.Grpc;
using Inventory.Application.Models.Responses.Externals;
using Inventory.Application.Services;
using Microsoft.Extensions.Logging;

#endregion

namespace Inventory.Infrastructure.Services;

public sealed class CatalogGrpcService(CatalogGrpc.CatalogGrpcClient grpcClient, ILogger<CatalogGrpcService> logger) : ICatalogGrpcService
{
    public async Task<GetProductByIdReponse?> GetProductByIdAsync(string productId, CancellationToken cancellationToken = default)
    {
		try
		{
            var result = await grpcClient.GetProductByIdAsync(
                new GetProductByIdRequest { Id = productId },
                cancellationToken: cancellationToken);

            var product = result.Product;

            return new GetProductByIdReponse()
            {
                Product = new ProductInfoReponse
                {
                    Id = Guid.Parse(product.Id),
                    Price = (decimal)product.Price,
                    Name = product.Name,
                    Thumbnail = product.Thumbnail
                }
            };
        }
		catch (Exception ex)
		{
            logger.LogWarning(ex, "Failed to get product by ID {ProductId} from Catalog Grpc service", productId);
            return null;
        }
    }
}
