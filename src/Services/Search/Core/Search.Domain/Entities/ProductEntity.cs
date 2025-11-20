#region using

using Search.Domain.Abstractions;
using Search.Domain.Enums;

#endregion

namespace Search.Domain.Entities;

public sealed class ProductEntity : Entity<string>
{
    #region Fields, Properties and Indexers

    public string Name { get; set; } = default!;

    public string Sku { get; set; } = default!;

    public string Slug { get; set; } = default!;

    public decimal Price { get; set; } = default!;

    public decimal? SalesPrice { get; set; } = default!;

    public List<string>? Categories { get; set; } = default!;

    public List<string>? Images { get; set; } = default!;

    public string Thumbnail { get; set; } = default!;

    public ProductStatus Status { get; set; }

    #endregion

    #region Factories

    public static ProductEntity Create(string id,
        string name,
        string sku,
        string slug,
        decimal price,
        decimal? salesPrice,
        List<string>? categories,
        string performedBy)
    {
        var product = new ProductEntity
        {
            Id = id,
            Name = name,
            Sku = sku,
            Slug = slug,
            Price = price,
            SalesPrice = salesPrice,
            Status = ProductStatus.OutOfStock,
            Categories = categories,
            CreatedOnUtc = DateTimeOffset.UtcNow,
            CreatedBy = performedBy
        };

        return product;
    }

    #endregion

    #region Methods

    public void Update(string name,
        string sku,
        string slug,
        decimal price,
        decimal? salesPrice,
        ProductStatus status,
        List<string>? categories,
        string? performedBy)
    {
        Name = name;
        Sku = sku;
        Slug = slug;
        Price = price;
        SalesPrice = salesPrice;
        Categories = categories;
        Status = status;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
        LastModifiedBy = performedBy;
    }

    #endregion
}
