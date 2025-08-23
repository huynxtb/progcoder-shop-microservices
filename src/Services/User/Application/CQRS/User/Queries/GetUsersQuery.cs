#region using

using User.Application.Data;
using User.Application.Dtos.Users;
using User.Application.Models.Responses;
using BuildingBlocks.Pagination.Extensions;
using Microsoft.EntityFrameworkCore;
using SourceCommon.Models.Reponses;

#endregion

namespace User.Application.CQRS.User.Queries;

public record class GetUsersFilter(string? SearchText);

public sealed record GetUsersQuery(
    GetUsersFilter Filter,
    PaginationRequest Paging) : IQuery<ResultSharedResponse<GetUsersReponse>>;

public sealed class GetUsersQueryHandler(IApplicationDbContext dbContext)
    : IQueryHandler<GetUsersQuery, ResultSharedResponse<GetUsersReponse>>
{
    #region Implementations

    public async Task<ResultSharedResponse<GetUsersReponse>> Handle(GetUsersQuery query, CancellationToken cancellationToken)
    {
        var total = await dbContext.Users
            .AsNoTracking()
            .CountAsync(cancellationToken);

        var totalPages = (int)Math.Ceiling(total / (double)query.Paging.PageSize);

        var result = await dbContext.Users
            .Where(
                x => string.IsNullOrEmpty(query.Filter.SearchText) || 
                x.UserName!.Contains(query.Filter.SearchText) ||
                x.FirstName!.Contains(query.Filter.SearchText) ||
                x.LastName!.Contains(query.Filter.SearchText))
            .OrderByDescending(x => x.CreatedOnUtc)
            .WithPaging(query.Paging)
            .AsNoTracking()
            .ToListAsync(cancellationToken);

        var reponse = new GetUsersReponse()
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

        return ResultSharedResponse<GetUsersReponse>
            .Success(reponse, MessageCode.GetSuccessfully);
    }

    #endregion
}