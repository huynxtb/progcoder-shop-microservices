#region using

using Search.Domain.Enums;

#endregion

namespace Search.Application.Dtos.Products;

public sealed class UpsertProductDto
{
    #region Fields, Properties and Indexers

    public string ProductId { get; set; } = default!;

    public string Name { get; set; } = default!;

    public string Sku { get; set; } = default!;

    public string Slug { get; set; } = default!;

    public decimal Price { get; set; }

    public decimal? SalesPrice { get; set; }

    public List<string>? Categories { get; set; }

    public List<string>? Images { get; set; }

    public string Thumbnail { get; set; } = default!;

    public ProductStatus Status { get; set; }

    public DateTimeOffset CreatedOnUtc { get; set; }

    public string? CreatedBy { get; set; }

    public DateTimeOffset? LastModifiedOnUtc { get; set; }

    public string? LastModifiedBy { get; set; }

    #endregion
}

