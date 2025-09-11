#region using

using Catalog.Application.CQRS.Product.Queries;
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
                Id = result.Id.ToString(),
                Name = result.Name,
                Thumbnail = result.Thumbnail,
                Price = (double)result.Price
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
                Thumbnail = p.Thumbnail ?? string.Empty,
                Price = (double)p.Price
            }));
        }

        return response;
    }

    #endregion
}
