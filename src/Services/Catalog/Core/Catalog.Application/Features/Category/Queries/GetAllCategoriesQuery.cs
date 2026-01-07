#region using

using AutoMapper;
using Catalog.Application.Dtos.Categories;
using Catalog.Application.Models.Filters;
using Catalog.Application.Models.Results;
using Catalog.Domain.Entities;
using Marten;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Catalog.Application.Features.Category.Queries;

public sealed record GetAllCategoriesQuery(GetAllCategoriesFilter Filter) : IQuery<GetAllCategoriesResult>;

public sealed class GetAllCategoriesQueryHandler(IDocumentSession session, IMapper mapper)
    : IQueryHandler<GetAllCategoriesQuery, GetAllCategoriesResult>
{
    #region Implementations

    public async Task<GetAllCategoriesResult> Handle(GetAllCategoriesQuery query, CancellationToken cancellationToken)
    {
        var filter = query.Filter;
        var result = await session.Query<CategoryEntity>()
            .Where(x => filter.ParentId == null || x.ParentId == filter.ParentId)
            .OrderByDescending(x => x.CreatedOnUtc)
            .ToListAsync(token: cancellationToken);

        var categories = mapper.Map<List<CategoryDto>>(result);

        foreach (var item in categories)
        {
            if (!item.ParentId.HasValue) continue;

            var parrent = categories.FirstOrDefault(x => x.Id == item.ParentId.Value);

            if (parrent == null) continue;

            item.ParentName = parrent.Name;
        }

        var response = new GetAllCategoriesResult(categories);

        return response;
    }

    #endregion
}