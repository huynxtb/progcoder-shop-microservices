#region using

using Catalog.Application.Models.Responses;
using Catalog.Domain.Entities;
using Marten;
using Common.Models.Reponses;

#endregion

namespace Catalog.Application.CQRS.Product.Queries;

public sealed record GetPublishProductByIdQuery(Guid ProductId) : IQuery<ResultSharedResponse<GetPublishProductByIdResponse>>;

public sealed class GetPublishProductByIdQueryHandler(IDocumentSession session)
    : IQueryHandler<GetPublishProductByIdQuery, ResultSharedResponse<GetPublishProductByIdResponse>>
{
    #region Implementations

    public async Task<ResultSharedResponse<GetPublishProductByIdResponse>> Handle(GetPublishProductByIdQuery query, CancellationToken cancellationToken)
    {
        var result = await session.Query<ProductEntity>()
            .Where(x => x.Id == query.ProductId && x.Published)
            .SingleOrDefaultAsync(cancellationToken)
            ?? throw new NotFoundException(MessageCode.ResourceNotFound, query.ProductId);

        var reponse = result.Adapt<GetPublishProductByIdResponse>();

        return ResultSharedResponse<GetPublishProductByIdResponse>.Success(reponse, MessageCode.GetSuccess);
    }

    #endregion
}