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

    public decimal? SalePrice { get; set; }

    public List<string>? CategoryNames { get; set; }

    public bool IsAvaiable { get; set; }

    public ProductStatus Status { get; set; }

    public string DisplayStatus { get; set; } = default!;

    public List<string>? Colors { get; set; }

    public List<string>? Sizes { get; set; }

    public List<string>? Tags { get; set; }

    public bool Published { get; set; }

    public bool Featured { get; set; }

    public string? BrandName { get; set; }

    public string? SEOTitle { get; set; }

    public string? SEODescription { get; set; }

    public string? Unit { get; set; }

    public decimal? Weight { get; set; }

    #endregion
}
