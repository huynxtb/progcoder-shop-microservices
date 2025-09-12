#region using

using Catalog.Application.Dtos.Categories;
using Catalog.Application.Models.Filters;
using Catalog.Application.Models.Results;
using Catalog.Domain.Entities;
using Marten;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Catalog.Application.CQRS.Category.Queries;

public sealed record GetAllCategoriesQuery(GetAllCategoriesFilter Filter) : IQuery<GetAllCategoriesResult>;

public sealed class GetAllCategoriesQueryHandler(IDocumentSession session)
    : IQueryHandler<GetAllCategoriesQuery, GetAllCategoriesResult>
{
    #region Implementations

    public async Task<GetAllCategoriesResult> Handle(GetAllCategoriesQuery query, CancellationToken cancellationToken)
    {
        var filter = query.Filter;
        var result = await session.Query<CategoryEntity>()
            .Where(x => x.ParentId == filter.ParentId)
            .OrderByDescending(x => x.CreatedOnUtc)
            .ToListAsync(token: cancellationToken);

        var response = new GetAllCategoriesResult(result.Adapt<List<CategoryDto>>());

        return response;
    }

    #endregion
}