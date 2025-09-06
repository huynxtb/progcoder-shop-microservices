#region using

using Order.Application.Dtos.Abstractions;

#endregion

namespace Order.Application.Dtos.InventoryItems;

public class ProductDto : DtoId<Guid>
{
    #region Fields, Properties and Indexers

    public string? Name { get; set; }

    #endregion
}
