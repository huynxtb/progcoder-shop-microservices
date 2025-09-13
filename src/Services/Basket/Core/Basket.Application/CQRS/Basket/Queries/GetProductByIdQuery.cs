#region using

using Basket.Application.Models.Results;
using Basket.Domain.Entities;
using Marten;

#endregion

namespace Basket.Application.CQRS.Product.Queries;

public sealed record GetProductByIdQuery(Guid ProductId) : IQuery<GetProductByIdResult>;

public sealed class GetProductByIdQueryHandler(IDocumentSession session)
    : IQueryHandler<GetProductByIdQuery, GetProductByIdResult>
{
    #region Implementations

    public async Task<GetProductByIdResult> Handle(GetProductByIdQuery query, CancellationToken cancellationToken)
    {
        var result = await session.LoadAsync<ProductEntity>(query.ProductId) 
            ?? throw new NotFoundException(MessageCode.ResourceNotFound, query.ProductId);

        var reponse = result.Adapt<GetProductByIdResult>();

        return reponse;
    }

    #endregion
}