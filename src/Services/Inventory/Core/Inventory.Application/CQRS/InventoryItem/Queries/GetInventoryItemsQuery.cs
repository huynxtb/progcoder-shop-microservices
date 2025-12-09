#region using

using AutoMapper;
using BuildingBlocks.Pagination.Extensions;
using Inventory.Application.Data;
using Inventory.Application.Dtos.InventoryItems;
using Inventory.Application.Models.Filters;
using Inventory.Application.Models.Results;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Inventory.Application.CQRS.InventoryItem.Queries;

public sealed record GetInventoryItemsQuery(
    GetInventoryItemsFilter Filter,
    PaginationRequest Paging) : IQuery<GetInventoryItemsResult>;

public sealed class GetInventoryItemsQueryHandler(IApplicationDbContext dbContext, IMapper mapper)
    : IQueryHandler<GetInventoryItemsQuery, GetInventoryItemsResult>
{
    #region Implementations

    public async Task<GetInventoryItemsResult> Handle(GetInventoryItemsQuery query, CancellationToken cancellationToken)
    {
        var filter = query.Filter;
        var paging = query.Paging;

        var filteredQuery = dbContext.InventoryItems
            .AsNoTracking()
            .Include(x => x.Location)
            .Where(x => string.IsNullOrEmpty(filter.SearchText) || 
                    x.Product.Name!.Contains(filter.SearchText) ||
                    x.Location.Location!.Contains(filter.SearchText));

        var totalCount = await filteredQuery.CountAsync(cancellationToken);
        var result = await filteredQuery
            .OrderByDescending(x => x.CreatedOnUtc)
            .WithPaging(query.Paging)
            .ToListAsync(cancellationToken);

        var items = mapper.Map<List<InventoryItemDto>>(result);
        var reponse = new GetInventoryItemsResult(items, totalCount, paging);

        return reponse;
    }

    #endregion
}