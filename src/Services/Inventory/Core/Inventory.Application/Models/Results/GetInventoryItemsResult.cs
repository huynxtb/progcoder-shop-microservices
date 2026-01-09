#region using

using Inventory.Application.Dtos.InventoryItems;

#endregion

namespace Inventory.Application.Models.Results;

public sealed class GetInventoryItemsResult
{
    #region Fields, Properties and Indexers

    public List<InventoryItemDto> Items { get; init; }

    public PagingResult Paging { get; init; }

    #endregion

    #region Ctors

    public GetInventoryItemsResult(
        List<InventoryItemDto> items,
        long totalCount,
        PaginationRequest pagination)
    {
        Items = items;
        Paging = PagingResult.Of(totalCount, pagination);
    }

    #endregion
}
