#region using

#endregion

namespace Inventory.Application.Dtos.InventoryItems;

public class UpdateStockDto
{
    #region Fields, Properties and Indexers

    public int Amount { get; set; }

    public string? Source { get; set; }

    #endregion
}
