#region using

using Inventory.Application.Dtos.Abstractions;

#endregion

namespace Inventory.Application.Dtos.Products;

public class ProductApiDto : DtoId<Guid>
{
    #region Fields, Properties and Indexers

    public string? Name { get; set; }

    public string? Sku { get; set; }

    public bool Published { get; set; }

    #endregion
}
