#region using

using Inventory.Application.Dtos.Abstractions;
using Inventory.Domain.Enums;

#endregion

namespace Inventory.Application.Dtos.InventoryItems;

public class UpdateStockDto : DtoId<Guid>
{
    #region Fields, Properties and Indexers

    public int Amount { get; set; }

    public string? Source { get; set; }

    public InventoryChangeType ChangeType { get; set; }

    #endregion
}
