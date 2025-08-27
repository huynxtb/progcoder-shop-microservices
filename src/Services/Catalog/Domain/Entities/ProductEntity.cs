#region using

using Catalog.Domain.Abstractions;
using Catalog.Domain.Enums;
using SourceCommon.Constants;

#endregion

namespace Catalog.Domain.Entities;

public sealed class ProductEntity : Entity<Guid>
{
    #region Fields, Properties and Indexers

    public string? Name { get; set; }

    public string? Sku { get; set; }

    public string? ShortDescription { get; set; }

    public string? LongDescription { get; set; }

    public string? Slug { get; set; }

    public decimal Price { get; set; }

    public decimal? SalesPrice { get; set; }

    public List<Guid>? CategoryIds { get; set; }

    public List<ProductImage>? Images { get; set; }

    public ProductStatus Status { get; set; }

    #endregion

    #region Ctors

    private ProductEntity() { }

    #endregion

    #region Methods

    public static ProductEntity Create(Guid id,
        string name,
        string sku,
        string shortDescription,
        string longDescription,
        string slug,
        decimal price,
        decimal? salesPrice,
        List<Guid>? categoryIds,
        string createdBy = SystemConst.CreatedBySystem)
    {
        var product = new ProductEntity
        {
            Id = id,
            Name = name,
            Sku = sku,
            ShortDescription = shortDescription,
            LongDescription = longDescription,
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
        string shortDescription,
        string longDescription,
        string slug,
        decimal price,
        decimal? salesPrice,
        List<Guid>? categoryIds,
        string modifiedBy = SystemConst.CreatedBySystem)
    {
        Name = name;
        Sku = sku;
        ShortDescription = shortDescription;
        LongDescription = longDescription;
        Slug = slug;
        Price = price;
        SalesPrice = salesPrice;
        Status = ProductStatus.Draft;
        CategoryIds = categoryIds;
        LastModifiedBy = modifiedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
    }

    public void AddOrUpdateImages(IEnumerable<ProductImage>? newImgs = null, IEnumerable<ProductImage>? original = null)
    {
        if (newImgs == null && original == null) return;

        newImgs ??= [];
        original ??= [];

        var imges = newImgs.ToList();

        if (Images == null || !Images.Any())
        {
            Images = imges;
        }
        else
        {
            Images ??= [];
            foreach (var img in original)
            {
                var existing = Images.FirstOrDefault(i => i.FileId == img.FileId);
                if (existing != null)
                {
                    Images.Add(img);
                }
            }
        }
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
