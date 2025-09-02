#region using

using BuildingBlocks.Pagination.Extensions;
using Inventory.Application.Data;
using Inventory.Application.Dtos.InventoryItems;
using Inventory.Application.Models.Filters;
using Inventory.Application.Models.Responses;
using Microsoft.EntityFrameworkCore;
using Common.Models.Reponses;

#endregion

namespace Inventory.Application.CQRS.InventoryItem.Queries;

public sealed record GetInventoryItemsQuery(
    GetInventoryItemsFilter Filter,
    PaginationRequest Paging) : IQuery<ResultSharedResponse<GetInventoryItemsResponse>>;

public sealed class GetInventoryItemsQueryHandler(IApplicationDbContext dbContext)
    : IQueryHandler<GetInventoryItemsQuery, ResultSharedResponse<GetInventoryItemsResponse>>
{
    #region Implementations

    public async Task<ResultSharedResponse<GetInventoryItemsResponse>> Handle(GetInventoryItemsQuery query, CancellationToken cancellationToken)
    {
        var filteredQuery = dbContext.InventoryItems
            .AsNoTracking()
            .Where(x => string.IsNullOrEmpty(query.Filter.SearchText) || 
                    x.Product.Name!.Contains(query.Filter.SearchText) ||
                    x.Location.Address!.Contains(query.Filter.SearchText));

        var total = await filteredQuery.CountAsync(cancellationToken);
        var totalPages = (int)Math.Ceiling(total / (double)query.Paging.PageSize);

        var result = await filteredQuery
            .OrderByDescending(x => x.CreatedOnUtc)
            .WithPaging(query.Paging)
            .ToListAsync(cancellationToken);

        var items = result.Adapt<List<InventoryItemDto>>();
        var paging = new PaginationResponse
        {
            Total = total,
            PageNumber = query.Paging.PageNumber,
            PageSize = query.Paging.PageSize,
            HasItem = result.Any(),
            TotalPages = totalPages,
            HasNextPage = query.Paging.PageNumber < totalPages,
            HasPreviousPage = query.Paging.PageNumber > 1
        };
        var reponse = new GetInventoryItemsResponse(items, paging);

        return ResultSharedResponse<GetInventoryItemsResponse>.Success(reponse, MessageCode.GetSuccess);
    }

    #endregion
}