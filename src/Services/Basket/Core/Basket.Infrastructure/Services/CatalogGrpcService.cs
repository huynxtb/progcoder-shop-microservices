#region using

using Basket.Application.Models.Responses.Externals;
using Basket.Application.Services;
using Catalog.Grpc;
using Microsoft.Extensions.Logging;

#endregion

namespace Basket.Infrastructure.Services;

public sealed class CatalogGrpcService(CatalogGrpc.CatalogGrpcClient grpcClient, ILogger<CatalogGrpcService> logger) : ICatalogGrpcService
{
    #region Methods

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

    public async Task<GetAllProductsResponse?> GetProductsAsync(string[]? ids = null, string searchText = "", CancellationToken cancellationToken = default)
    {
        try
        {
            var request = new GetProductsRequest { SearchText = searchText };
            if (ids is not null && ids.Length > 0)
                request.Ids.AddRange(ids);

            var result = await grpcClient.GetProductsAsync(request, cancellationToken: cancellationToken);

            var response = new GetAllProductsResponse
            {
                Items = result.Products
                    .Select(p => new ProductReponse
                    {
                        Id = Guid.Parse(p.Id),
                        Name = p.Name,
                        Price = (decimal)p.Price,
                        Thumbnail = p.Thumbnail
                    })
                    .ToList()
            };

            return response;
        }
        catch (Exception ex)
        {
            logger.LogWarning(ex, "Failed to get products from Catalog Grpc service");
            return null;
        }
    }

    public async Task<GetAllProductsResponse?> GetAllAvailableProductsAsync(string[]? ids = null, string searchText = "", CancellationToken cancellationToken = default)
    {
        try
        {
            var request = new GetAllAvailableProductsRequest { SearchText = searchText };

            if (ids is not null && ids.Length > 0)
                request.Ids.AddRange(ids);

            var result = await grpcClient.GetAllAvailableProductsAsync(request, cancellationToken: cancellationToken);

            var response = new GetAllProductsResponse
            {
                Items = result.Products
                    .Select(p => new ProductReponse
                    {
                        Id = Guid.Parse(p.Id),
                        Name = p.Name,
                        Price = (decimal)p.Price,
                        Thumbnail = p.Thumbnail
                    })
                    .ToList()
            };

            return response;
        }
        catch (Exception ex)
        {
            logger.LogWarning(ex, "Failed to get all available products from Catalog Grpc service");
            return null;
        }
    }

    #endregion
}
