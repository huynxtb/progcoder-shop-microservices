#region using

using Catalog.Application.Features.Product.Queries;
using Catalog.Application.Models.Filters;
using Grpc.Core;
using MediatR;

#endregion

namespace Catalog.Grpc.Services;

public sealed class CatalogGrpcService(ISender sender) : CatalogGrpc.CatalogGrpcBase
{
    #region Methods

    public override async Task<GetProductByIdResponse> GetProductById(GetProductByIdRequest request, ServerCallContext context)
    {
        var result = await sender.Send(new GetProductByIdQuery(Guid.Parse(request.Id)));
        var response = new GetProductByIdResponse
        {
            Product = new Product
            {
                Id = result.Product.Id.ToString(),
                Name = result.Product.Name,
                Thumbnail = result.Product.Thumbnail?.PublicURL,
                Price = result.Product.SalePrice != null ? (double)result.Product.SalePrice : (double)result.Product.Price
            }
        };
        return response;
    }

    public override async Task<GetProductsResponse> GetProducts(GetProductsRequest request, ServerCallContext context)
    {
        var filter = new GetAllProductsFilter(request.SearchText, request.Ids?.Select(Guid.Parse).ToArray() ?? Array.Empty<Guid>());
        var query = new GetAllProductsQuery(filter);
        var result = await sender.Send(query);

        var response = new GetProductsResponse();

        if (result.Items != null)
        {
            response.Products.AddRange(result.Items.Select(p => new Product
            {
                Id = p.Id.ToString(),
                Name = p.Name ?? string.Empty,
                Thumbnail = p.Thumbnail?.PublicURL!,
                Price = p.SalePrice != null ? (double)p.SalePrice : (double)p.Price
            }));
        }

        return response;
    }

    public override async Task<GetCountProductResponse> GetCountProduct(GetCountProductRequest request, ServerCallContext context)
    {
        var query = new GetCountProductQuery();
        var result = await sender.Send(query);
        var response = new GetCountProductResponse
        {
            Count = result.Count
        };
        return response;
    }

    public override async Task<GetAllAvailableProductsResponse> GetAllAvailableProducts(GetAllAvailableProductsRequest request, ServerCallContext context)
    {
        var filter = new GetAllProductsFilter(request.SearchText, request.Ids?.Select(Guid.Parse).ToArray() ?? Array.Empty<Guid>());
        var query = new GetAllAvailableProductsQuery(filter);
        var result = await sender.Send(query);

        var response = new GetAllAvailableProductsResponse();

        if (result.Items != null)
        {
            response.Products.AddRange(result.Items.Select(p => new Product
            {
                Id = p.Id.ToString(),
                Name = p.Name ?? string.Empty,
                Thumbnail = p.Thumbnail?.PublicURL!,
                Price = p.SalePrice != null ? (double)p.SalePrice : (double)p.Price
            }));
        }

        return response;
    }
    #endregion
}
