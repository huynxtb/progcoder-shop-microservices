#region using

using AutoMapper;
using Catalog.Application.Dtos.Brands;
using Catalog.Application.Models.Results;
using Catalog.Domain.Entities;
using Marten;

#endregion

namespace Catalog.Application.CQRS.Brand.Queries;

public sealed record GetAllBrandsQuery : IQuery<GetAllBrandsResult>;

public sealed class GetAllBrandsQueryHandler(IDocumentSession session, IMapper mapper)
    : IQueryHandler<GetAllBrandsQuery, GetAllBrandsResult>
{
    #region Implementations

    public async Task<GetAllBrandsResult> Handle(GetAllBrandsQuery query, CancellationToken cancellationToken)
    {
        var result = await session.Query<BrandEntity>()
            .OrderByDescending(x => x.CreatedOnUtc)
            .ToListAsync(token: cancellationToken);

        var response = new GetAllBrandsResult(mapper.Map<List<BrandDto>>(result));

        return response;
    }

    #endregion
}
