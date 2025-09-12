#region using

using Inventory.Application.Dtos.InventoryItems;
using Common.Models.Reponses;

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
        long totalItems,
        int pageNumber,
        int pageSize)
    {
        Items = items;
        Paging = PagingResult.Of(totalItems, pageNumber, pageSize);
    }

    #endregion
}
