#region using

using Inventory.Application.Dtos.Abstractions;
using Inventory.Application.Dtos.Products;

#endregion

namespace Inventory.Application.Dtos.InventoryItems;

public class InventoryItemDto : EntityDto<Guid>
{
    #region Fields, Properties and Indexers

    public Guid ProductId { get; set; }

    public ProductApiDto Product { get; set; } = default!;

    public int Quantity { get; set; }

    public int Reserved { get; set; }

    public int Available { get; init; }

    public LocationDto Location { get; set; } = default!;

    #endregion
}
