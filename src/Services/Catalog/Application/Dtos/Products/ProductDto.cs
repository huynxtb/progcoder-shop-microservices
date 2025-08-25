#region using

using Catalog.Application.Dtos.Abstractions;
using Catalog.Domain.Entities;
using Catalog.Domain.Enums;

#endregion

namespace Catalog.Application.Dtos.Products;

public class ProductDto : EntityDto<Guid>
{
    #region Fields, Properties and Indexers

    public string? Name { get; private set; }

    public string? Sku { get; private set; }

    public string? ShortDescription { get; private set; }

    public string? LongDescription { get; private set; }

    public string? Slug { get; private set; }

    public decimal Price { get; private set; }

    public decimal? SalesPrice { get; private set; }

    public List<string>? Categories { get; private set; }

    public ProductStatus Status { get; private set; }

    public List<ProductImageDto>? Images {  get; set; }

    #endregion
}
