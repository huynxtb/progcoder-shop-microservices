#region using

using Inventory.Application.Dtos.Abstractions;

#endregion

namespace Inventory.Application.Dtos.InventoryItems;

public sealed class InventoryHistoryDto : EntityDto<Guid>
{
    #region Fields, Properties and Indexers

    public string Message { get; set; } = default!;

    #endregion
}

