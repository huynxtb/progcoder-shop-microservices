#region using

using Application.Data;
using Application.Dtos.LoginHistories;
using Application.Models.Responses;
using BuildingBlocks.Pagination.Extensions;
using Microsoft.EntityFrameworkCore;
using SourceCommon.Models.Reponses;

#endregion

namespace Application.CQRS.AccountProfile.Queries;

public sealed record GetLoginHistoriesFilter(
    string? SearchText, 
    Guid CurrentUserId);

public sealed record GetLoginHistoriesQuery(
    GetLoginHistoriesFilter Filter,
    PaginationRequest Paging) : IQuery<ResultSharedResponse<GetLoginHistoriesReponse>>;

public sealed class GetLoginHistoriesQueryHandler(IReadDbContext dbContext)
    : IQueryHandler<GetLoginHistoriesQuery, ResultSharedResponse<GetLoginHistoriesReponse>>
{
    #region Implementations

    public async Task<ResultSharedResponse<GetLoginHistoriesReponse>> Handle(GetLoginHistoriesQuery query, CancellationToken cancellationToken)
    {
        var total = await dbContext.LoginHistories.CountAsync(cancellationToken);
        var totalPages = (int)Math.Ceiling(total / (double)query.Paging.PageSize);

        var result = await dbContext.LoginHistories
            .Where(x => 
                x.UserId == query.Filter.CurrentUserId &&
                (string.IsNullOrEmpty(query.Filter.SearchText) ||
                x.IpAddress!.Contains(query.Filter.SearchText)))
            .OrderByDescending(x => x.CreatedAt)
            .Skip(query.Paging.ToSkip())
            .Take(query.Paging.ToTake())
            .ToListAsync(cancellationToken);

        var reponse = new GetLoginHistoriesReponse()
        {
            Items = result.Adapt<List<LoginHistoryDto>>(),
            Paging = new()
            {
                Total = total,
                PageNumber = query.Paging.PageNumber,
                PageSize = query.Paging.PageSize,
                HasItem = result.Any(),
                TotalPages = totalPages,
                HasNextPage = query.Paging.PageNumber < totalPages,
                HasPreviousPage = query.Paging.PageNumber > 1
            }
        };

        return ResultSharedResponse<GetLoginHistoriesReponse>
            .Success(reponse, MessageCode.GetSuccessfully);
    }

    #endregion
}