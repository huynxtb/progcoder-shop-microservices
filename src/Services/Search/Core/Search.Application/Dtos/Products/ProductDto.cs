#region using

using Search.Application.Dtos.Abstractions;
using Search.Domain.Enums;

#endregion

namespace Search.Application.Dtos.Products;

public sealed class ProductDto : EntityDto<string>
{
    #region Fields, Properties and Indexers

    public string Name { get; set; } = default!;

    public string Sku { get; set; } = default!;

    public string Slug { get; set; } = default!;

    public decimal Price { get; set; }

    public decimal? SalesPrice { get; set; }

    public List<string>? Categories { get; set; }

    public List<string>? Images { get; set; }

    public string Thumbnail { get; set; } = default!;

    public ProductStatus Status { get; set; }

    public string DisplayStatus { get; set; } = default!;

    #endregion
}

