#region using

using Inventory.Application.Dtos.Abstractions;

#endregion

namespace Inventory.Application.Dtos.InventoryItems;

public class ProductDto : DtoId<Guid>
{
    #region Fields, Properties and Indexers

    public string? Name { get; set; }

    #endregion
}
