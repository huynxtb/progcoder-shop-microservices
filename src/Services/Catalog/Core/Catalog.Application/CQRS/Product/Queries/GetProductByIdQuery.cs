#region using

using Catalog.Application.Models.Responses;
using Catalog.Domain.Entities;
using Marten;

#endregion

namespace Catalog.Application.CQRS.Product.Queries;

public sealed record GetProductByIdQuery(Guid ProductId) : IQuery<GetProductByIdResponse>;

public sealed class GetProductByIdQueryHandler(IDocumentSession session)
    : IQueryHandler<GetProductByIdQuery, GetProductByIdResponse>
{
    #region Implementations

    public async Task<GetProductByIdResponse> Handle(GetProductByIdQuery query, CancellationToken cancellationToken)
    {
        var result = await session.LoadAsync<ProductEntity>(query.ProductId) 
            ?? throw new NotFoundException(MessageCode.ResourceNotFound, query.ProductId);

        var reponse = result.Adapt<GetProductByIdResponse>();

        return reponse;
    }

    #endregion
}