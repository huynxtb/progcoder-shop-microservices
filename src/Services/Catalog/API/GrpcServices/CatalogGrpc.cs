#region using

using Catalog.Application.CQRS.Product.Queries;
using Catalog.Grpc;
using Grpc.Core;

#endregion

namespace Catalog.Api.GrpcServices;

public sealed class CatalogGrpc(ISender sender) : Grpc.CatalogGrpc.CatalogGrpcBase
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
				Description = result.ShortDescription,
				Price = (double)result.Price
            }
		};
		return response;
	}

	#endregion
}
