#region using

using Inventory.Application.Dtos.InventoryItems;

#endregion

namespace Inventory.Application.Models.Results;

public sealed class GetAllHistoriesResult
{
    #region Fields, Properties and Indexers

    public List<InventoryHistoryDto> Items { get; init; }

    #endregion

    #region Ctors

    public GetAllHistoriesResult(List<InventoryHistoryDto> items)
    {
        Items = items;
    }

    #endregion
}

