#region using

using AutoMapper;
using Inventory.Application.Dtos.InventoryItems;
using Inventory.Application.Models.Filters;
using Inventory.Application.Models.Results;
using Inventory.Domain.Abstractions;

#endregion

namespace Inventory.Application.Features.InventoryItem.Queries;

public sealed record GetInventoryItemsQuery(
    GetInventoryItemsFilter Filter,
    PaginationRequest Paging) : IQuery<GetInventoryItemsResult>;

public sealed class GetInventoryItemsQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    : IQueryHandler<GetInventoryItemsQuery, GetInventoryItemsResult>
{
    #region Implementations

    public async Task<GetInventoryItemsResult> Handle(GetInventoryItemsQuery query, CancellationToken cancellationToken)
    {
        var filter = query.Filter;
        var paging = query.Paging;

        var result = unitOfWork.InventoryItems
            .SearchWithRelationshipAsync(x =>
                string.IsNullOrEmpty(filter.SearchText) ||
                x.Product.Name!.Contains(filter.SearchText) ||
                x.Location.Location!.Contains(filter.SearchText),
                paging,
                cancellationToken);

        var totalCount = await unitOfWork.InventoryItems
            .CountAsync(x =>
                string.IsNullOrEmpty(filter.SearchText) ||
                x.Product.Name!.Contains(filter.SearchText) ||
                x.Location.Location!.Contains(filter.SearchText),
                cancellationToken);

        var items = mapper.Map<List<InventoryItemDto>>(result);
        var reponse = new GetInventoryItemsResult(items, totalCount, paging);

        return reponse;
    }

    #endregion
}