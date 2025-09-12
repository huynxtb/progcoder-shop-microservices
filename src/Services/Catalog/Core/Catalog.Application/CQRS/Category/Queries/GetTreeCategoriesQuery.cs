#region using

using Catalog.Application.Dtos.Categories;
using Catalog.Application.Models.Results;
using Catalog.Domain.Entities;
using Marten;
using Microsoft.EntityFrameworkCore;

#endregion
namespace Catalog.Application.CQRS.Category.Queries;

public sealed record GetTreeCategoriesQuery : IQuery<GetTreeCategoriesResult>;

public sealed class GetTreeCategoriesQueryHandler(IDocumentSession session)
    : IQueryHandler<GetTreeCategoriesQuery, GetTreeCategoriesResult>
{
    #region Implementations

    public async Task<GetTreeCategoriesResult> Handle(GetTreeCategoriesQuery query, CancellationToken cancellationToken)
    {
        var flat = await session.Query<CategoryEntity>()
            .Select(x => new CategoryTreeItemDto
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                Slug = x.Slug,
                ParentId = x.ParentId
            })
            .ToListAsync(token: cancellationToken);

        var byId = flat.ToDictionary(x => x.Id);
        var roots = new List<CategoryTreeItemDto>(capacity: flat.Count);

        foreach (var node in flat)
        {
            if (node.ParentId is { } pid && pid != node.Id && byId.TryGetValue(pid, out var parent))
            {
                parent.Children ??= [];
                parent.Children.Add(node);
            }
            else
            {
                roots.Add(node);
            }
        }

        var response = new GetTreeCategoriesResult(roots);

        return response;
    }

    #endregion

}