#region using

using User.Application.Data;
using User.Application.Dtos.Users;
using User.Application.Models.Responses;
using BuildingBlocks.Pagination.Extensions;
using Microsoft.EntityFrameworkCore;
using SourceCommon.Models.Reponses;
using User.Application.Models.Filters;

#endregion

namespace User.Application.CQRS.User.Queries;

public sealed record GetUsersQuery(
    GetUsersFilter Filter,
    PaginationRequest Paging) : IQuery<ResultSharedResponse<GetUsersResponse>>;

public sealed class GetUsersQueryHandler(IApplicationDbContext dbContext)
    : IQueryHandler<GetUsersQuery, ResultSharedResponse<GetUsersResponse>>
{
    #region Implementations

    public async Task<ResultSharedResponse<GetUsersResponse>> Handle(GetUsersQuery query, CancellationToken cancellationToken)
    {
        var filteredQuery = dbContext.Users
            .AsNoTracking()
            .Where(x => string.IsNullOrEmpty(query.Filter.SearchText)
                || x.UserName!.Contains(query.Filter.SearchText)
                || x.FirstName!.Contains(query.Filter.SearchText)
                || x.LastName!.Contains(query.Filter.SearchText));

        var total = await filteredQuery.CountAsync(cancellationToken);
        var totalPages = (int)Math.Ceiling(total / (double)query.Paging.PageSize);

        var result = await filteredQuery
            .OrderByDescending(x => x.CreatedOnUtc)
            .WithPaging(query.Paging)
            .ToListAsync(cancellationToken);

        var reponse = new GetUsersResponse()
        {
            Items = result.Adapt<List<UserDto>>(),
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

        return ResultSharedResponse<GetUsersResponse>.Success(reponse, MessageCode.GetSuccess);
    }

    #endregion
}