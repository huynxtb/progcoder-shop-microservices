#region using

using User.Application.Data;
using User.Application.Dtos.LoginHistories;
using User.Application.Models.Responses;
using BuildingBlocks.Pagination.Extensions;
using Microsoft.EntityFrameworkCore;
using SourceCommon.Models.Reponses;

#endregion

namespace User.Application.CQRS.LoginHistory.Queries;

public sealed record GetLoginHistoriesFilter(string? SearchText);

public sealed record GetLoginHistoriesQuery(
    GetLoginHistoriesFilter Filter,
    PaginationRequest Paging,
    Guid CurrentUserId) : IQuery<ResultSharedResponse<GetLoginHistoriesResponse>>;

public sealed class GetLoginHistoriesQueryHandler(IApplicationDbContext dbContext)
    : IQueryHandler<GetLoginHistoriesQuery, ResultSharedResponse<GetLoginHistoriesResponse>>
{
    #region Implementations

    public async Task<ResultSharedResponse<GetLoginHistoriesResponse>> Handle(GetLoginHistoriesQuery query, CancellationToken cancellationToken)
    {
        var total = await dbContext.LoginHistories.CountAsync(cancellationToken);
        var totalPages = (int)Math.Ceiling(total / (double)query.Paging.PageSize);

        var result = await dbContext.LoginHistories
            .Where(x => 
                x.UserId == query.CurrentUserId &&
                (string.IsNullOrEmpty(query.Filter.SearchText) ||
                x.IpAddress!.Contains(query.Filter.SearchText)))
            .OrderByDescending(x => x.CreatedOnUtc)
            .WithPaging(query.Paging)
            .ToListAsync(cancellationToken);

        var reponse = new GetLoginHistoriesResponse()
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

        return ResultSharedResponse<GetLoginHistoriesResponse>
            .Success(reponse, MessageCode.GetSuccess);
    }

    #endregion
}