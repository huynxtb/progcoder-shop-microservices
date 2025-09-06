#region using

using Order.Application.Dtos.Abstractions;

#endregion

namespace Order.Application.Dtos.Products;

public class ProductApiDto : DtoId<Guid>
{
    #region Fields, Properties and Indexers

    public string? Name { get; set; }

    public string? Sku { get; set; }

    public bool Published { get; set; }

    #endregion
}
