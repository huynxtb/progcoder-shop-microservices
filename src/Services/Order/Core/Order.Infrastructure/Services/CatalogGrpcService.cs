#region using

using Catalog.Grpc;
using Microsoft.Extensions.Logging;
using Order.Application.Models.Responses.Externals;
using Order.Application.Services;

#endregion

namespace Order.Infrastructure.Services;

public sealed class CatalogGrpcService(CatalogGrpc.CatalogGrpcClient grpcClient, ILogger<CatalogGrpcService> logger) : ICatalogGrpcService
{
    public async Task<ProductReponse?> GetProductByIdAsync(string productId, CancellationToken cancellationToken = default)
    {
        try
        {
            var result = await grpcClient.GetProductByIdAsync(
                new GetProductByIdRequest { Id = productId },
                cancellationToken: cancellationToken);

            var product = result.Product;

            return new ProductReponse()
            {
                Id = Guid.Parse(product.Id),
                Price = (decimal)product.Price,
                Name = product.Name
            };
        }
        catch (Exception ex)
        {
            logger.LogWarning(ex, "Failed to get product by ID {ProductId} from Catalog Grpc service", productId);
            return null;
        }
    }
}
