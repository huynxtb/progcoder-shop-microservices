#region using

using AutoMapper;
using Catalog.Application.Models.Results;
using Catalog.Domain.Entities;
using Marten;

#endregion

namespace Catalog.Application.Features.Product.Queries;

public sealed record GetCountProductQuery : IQuery<GetCountProductsResult>;

public sealed class GetCountProductQueryHandler(IDocumentSession session)
    : IQueryHandler<GetCountProductQuery, GetCountProductsResult>
{
    #region Implementations

    public async Task<GetCountProductsResult> Handle(GetCountProductQuery query, CancellationToken cancellationToken)
    {
        var productQuery = session.Query<ProductEntity>().AsQueryable();
        var totalCount = await productQuery.CountAsync(cancellationToken);

        return new GetCountProductsResult(totalCount);
    }

    #endregion
}