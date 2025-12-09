#region using

using Inventory.Application.Dtos.InventoryItems;

#endregion

namespace Inventory.Application.Models.Results;

public sealed class GetAllInventoryItemResult
{
    #region Fields, Properties and Indexers

    public List<InventoryItemDto> Items { get; init; }

    #endregion

    #region Ctors

    public GetAllInventoryItemResult(List<InventoryItemDto> items)
    {
        Items = items;
    }

    #endregion
}
