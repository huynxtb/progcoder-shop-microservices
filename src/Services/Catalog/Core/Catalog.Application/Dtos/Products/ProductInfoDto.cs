#region using

using Catalog.Application.Dtos.Abstractions;
using Catalog.Domain.Enums;

#endregion

namespace Catalog.Application.Dtos.Products;

public class ProductInfoDto : DtoId<Guid>
{
    #region Fields, Properties and Indexers

    public string? Name { get; set; }

    public string? Sku { get; set; }

    public string? ShortDescription { get; set; }

    public string? LongDescription { get; set; }

    public string? Slug { get; set; }

    public decimal Price { get; set; }

    public decimal? SalesPrice { get; set; }

    public List<string>? Categories { get; set; }

    public bool Published { get; set; }

    public bool IsAvaiable { get; set; }

    public ProductStatus Status { get; set; }

    public string DisplayStatus { get; set; } = default!;

    #endregion
}
