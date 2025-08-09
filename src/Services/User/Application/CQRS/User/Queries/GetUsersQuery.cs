#region using

using Application.Data;
using Application.Dtos.Users;
using Application.Models.Responses;
using BuildingBlocks.Pagination.Extensions;
using Microsoft.EntityFrameworkCore;
using SourceCommon.Models.Reponses;

#endregion

namespace Application.CQRS.AccountProfile.Queries;

public sealed class GetUsersFilter
{
    #region Fields, Properties and Indexers

    public string? SearchText { get; set; }

    public string? RequestUserId { get; set; }

    #endregion
}

public sealed record GetUsersQuery(
    GetUsersFilter Filter,
    PaginationRequest Paging) : IQuery<ResultSharedResponse<GetUsersReponse>>;

public sealed class GetUsersQueryHandler(IReadDbContext dbContext)
    : IQueryHandler<GetUsersQuery, ResultSharedResponse<GetUsersReponse>>
{
    #region Implementations

    public async Task<ResultSharedResponse<GetUsersReponse>> Handle(GetUsersQuery query, CancellationToken cancellationToken)
    {
        var total = await dbContext.Users.CountAsync(cancellationToken);
        var totalPages = (int)Math.Ceiling(total / (double)query.Paging.PageSize);

        var result = await dbContext.Users
            .Where(
                x => string.IsNullOrEmpty(query.Filter.SearchText) || 
                x.UserName!.Contains(query.Filter.SearchText) ||
                x.FirstName!.Contains(query.Filter.SearchText) ||
                x.LastName!.Contains(query.Filter.SearchText))
            .OrderByDescending(x => x.CreatedAt)
            .Skip(query.Paging.ToSkip())
            .Take(query.Paging.ToTake())
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