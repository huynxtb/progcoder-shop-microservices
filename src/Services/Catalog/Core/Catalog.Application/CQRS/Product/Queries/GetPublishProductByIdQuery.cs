#region using

using Catalog.Application.Models.Responses;
using Catalog.Domain.Entities;
using Marten;

#endregion

namespace Catalog.Application.CQRS.Product.Queries;

public sealed record GetPublishProductByIdQuery(Guid ProductId) : IQuery<GetPublishProductByIdResponse>;

public sealed class GetPublishProductByIdQueryHandler(IDocumentSession session)
    : IQueryHandler<GetPublishProductByIdQuery, GetPublishProductByIdResponse>
{
    #region Implementations

    public async Task<GetPublishProductByIdResponse> Handle(GetPublishProductByIdQuery query, CancellationToken cancellationToken)
    {
        var result = await session.Query<ProductEntity>()
            .Where(x => x.Id == query.ProductId && x.Published)
            .SingleOrDefaultAsync(cancellationToken)
            ?? throw new NotFoundException(MessageCode.ResourceNotFound, query.ProductId);

        var reponse = result.Adapt<GetPublishProductByIdResponse>();

        return reponse;
    }

    #endregion
}