#region using

using Order.Application.Dtos.Abstractions;
using Order.Domain.Enums;

#endregion

namespace Order.Application.Dtos.InventoryItems;

public class UpdateStockDto
{
    #region Fields, Properties and Indexers

    public int Amount { get; set; }

    public string? Source { get; set; }

    #endregion
}
