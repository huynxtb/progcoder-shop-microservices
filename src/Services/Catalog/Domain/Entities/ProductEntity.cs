#region using

using Catalog.Domain.Abstractions;
using Catalog.Domain.Enums;
using SourceCommon.Constants;

#endregion

namespace Catalog.Domain.Entities;

public sealed class ProductEntity : Entity<Guid>
{
    #region Fields, Properties and Indexers

    public string? Name { get; private set; }

    public string? Sku { get; private set; }

    public string? ShortDescription { get; private set; }

    public string? LongDescription { get; private set; }

    public string? Slug { get; private set; }

    public decimal Price { get; private set; }

    public decimal? SalesPrice { get; private set; }

    public List<string>? CategoryIds { get; private set; }

    public List<ProductImage>? Images { get; private set; }

    public ProductStatus Status { get; private set; }

    #endregion

    #region Ctors

    private ProductEntity() { }

    #endregion

    #region Methods

    public static ProductEntity Create(Guid id,
        string name,
        string sku,
        string shortDesciption,
        string longDesciption,
        string slug,
        decimal price,
        decimal? salesPrice,
        List<string>? categoryIds,
        string createdBy = SystemConst.CreatedBySystem)
    {
        var product = new ProductEntity
        {
            Id = id,
            Name = name,
            Sku = sku,
            ShortDescription = shortDesciption,
            LongDescription = longDesciption,
            Slug = slug,
            Price = price,
            SalesPrice = salesPrice,
            Status = ProductStatus.Draft,
            CategoryIds = categoryIds,
            CreatedBy = createdBy,
            LastModifiedBy = createdBy,
            CreatedOnUtc = DateTimeOffset.UtcNow,
            LastModifiedOnUtc = DateTimeOffset.UtcNow
        };

        return product;
    }

    public void Update(string name,
        string sku,
        string shortDesciption,
        string longDesciption,
        string slug,
        decimal price,
        decimal? salesPrice,
        List<string>? categoryIds,
        string modifiedBy = SystemConst.CreatedBySystem)
    {
        Name = name;
        Sku = sku;
        ShortDescription = shortDesciption;
        LongDescription = longDesciption;
        Slug = slug;
        Price = price;
        SalesPrice = salesPrice;
        Status = ProductStatus.Draft;
        CategoryIds = categoryIds;
        LastModifiedBy = modifiedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
    }

    public void AddOrUpdateImages(IEnumerable<ProductImage> originalImgs, IEnumerable<ProductImage> newImgs)
    {

    }

    public void Approve(string modifiedBy = SystemConst.CreatedBySystem)
    {
        Status = ProductStatus.Approved;
        LastModifiedBy = modifiedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
    }

    public void Reject(string modifiedBy = SystemConst.CreatedBySystem)
    {
        Status = ProductStatus.Rejected;
        LastModifiedBy = modifiedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
    }

    public void SendToApproval(string modifiedBy = SystemConst.CreatedBySystem)
    {
        Status = ProductStatus.AwaitingApproval;
        LastModifiedBy = modifiedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
    }

    #endregion
}
