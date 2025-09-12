#region using

using Catalog.Application.Models.Results;
using Catalog.Domain.Entities;
using Marten;

#endregion

namespace Catalog.Application.CQRS.Product.Queries;

public sealed record GetPublishProductByIdQuery(Guid ProductId) : IQuery<GetPublishProductByIdResult>;

public sealed class GetPublishProductByIdQueryHandler(IDocumentSession session)
    : IQueryHandler<GetPublishProductByIdQuery, GetPublishProductByIdResult>
{
    #region Implementations

    public async Task<GetPublishProductByIdResult> Handle(GetPublishProductByIdQuery query, CancellationToken cancellationToken)
    {
        var result = await session.Query<ProductEntity>()
            .Where(x => x.Id == query.ProductId && x.Published)
            .SingleOrDefaultAsync(cancellationToken)
            ?? throw new NotFoundException(MessageCode.ResourceNotFound, query.ProductId);

        var reponse = result.Adapt<GetPublishProductByIdResult>();

        return reponse;
    }

    #endregion
}