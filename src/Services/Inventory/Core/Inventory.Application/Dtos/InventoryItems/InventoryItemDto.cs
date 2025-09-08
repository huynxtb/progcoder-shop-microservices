#region using

using Inventory.Application.Dtos.Abstractions;

#endregion

namespace Inventory.Application.Dtos.InventoryItems;

public class InventoryItemDto : EntityDto<Guid>
{
    #region Fields, Properties and Indexers

    public Guid ProductId { get; set; }

    public ProductDto Product { get; set; } = default!;

    public int Quantity { get; set; }

    public int Reserved { get; set; }

    public int Available { get; init; }

    public LocationDto Location { get; set; } = default!;

    #endregion
}
