#region using

using Catalog.Application.Models.Responses;
using Catalog.Domain.Entities;
using Marten;
using SourceCommon.Models.Reponses;

#endregion

namespace Catalog.Application.CQRS.Product.Queries;

public sealed record GetProductByIdQuery(Guid ProductId) : IQuery<ResultSharedResponse<GetProductByIdResponse>>;

public sealed class GetProductByIdQueryHandler(IDocumentSession session)
    : IQueryHandler<GetProductByIdQuery, ResultSharedResponse<GetProductByIdResponse>>
{
    #region Implementations

    public async Task<ResultSharedResponse<GetProductByIdResponse>> Handle(GetProductByIdQuery query, CancellationToken cancellationToken)
    {
        var result = await session.LoadAsync<ProductEntity>(query.ProductId) 
            ?? throw new NotFoundException(MessageCode.ResourceNotFound, query.ProductId);

        var reponse = result.Adapt<GetProductByIdResponse>();

        return ResultSharedResponse<GetProductByIdResponse>.Success(reponse, MessageCode.GetSuccess);
    }

    #endregion
}