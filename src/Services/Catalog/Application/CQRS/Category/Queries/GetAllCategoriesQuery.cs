#region using

using Catalog.Application.Dtos.Categories;
using Catalog.Application.Models.Responses;
using Catalog.Domain.Entities;
using Marten;
using Microsoft.EntityFrameworkCore;
using SourceCommon.Models.Reponses;

#endregion

namespace Catalog.Application.CQRS.Category.Queries;

public record class GetAllCategoriesFilter(Guid? ParentId);

public sealed record GetAllCategoriesQuery(GetAllCategoriesFilter Filter) : IQuery<ResultSharedResponse<GetAllCategoriesResponse>>;

public sealed class GetAllCategoriesQueryHandler(IDocumentSession session)
    : IQueryHandler<GetAllCategoriesQuery, ResultSharedResponse<GetAllCategoriesResponse>>
{
    #region Implementations

    public async Task<ResultSharedResponse<GetAllCategoriesResponse>> Handle(GetAllCategoriesQuery query, CancellationToken cancellationToken)
    {
        var filter = query.Filter;
        var result = await session.Query<CategoryEntity>()
            .Where(x => x.ParentId == filter.ParentId)
            .OrderByDescending(x => x.CreatedOnUtc)
            .ToListAsync(token: cancellationToken);

        var response = new GetAllCategoriesResponse(result.Adapt<List<CategoryDto>>());

        return ResultSharedResponse<GetAllCategoriesResponse>
            .Success(response, MessageCode.GetSuccess);
    }

    #endregion
}