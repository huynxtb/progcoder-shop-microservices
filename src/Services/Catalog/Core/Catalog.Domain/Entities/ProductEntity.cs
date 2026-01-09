#region using

using Catalog.Domain.Abstractions;
using Catalog.Domain.Enums;
using Catalog.Domain.Exceptions;
using System.Data;

#endregion

namespace Catalog.Domain.Entities;

public sealed class ProductEntity : Aggregate<Guid>
{
    #region Fields, Properties and Indexers

    public string? Name { get; set; }

    public string? Sku { get; set; }

    public string? ShortDescription { get; set; }

    public string? LongDescription { get; set; }

    public string? Slug { get; set; }

    public string? Barcode { get; set; }

    public decimal Price { get; set; }

    public decimal? SalePrice { get; set; }

    public List<Guid>? CategoryIds { get; set; }

    public List<ProductImageEntity>? Images { get; set; }

    public ProductImageEntity? Thumbnail { get; set; }

    public List<string>? Colors { get; set; }

    public List<string>? Sizes { get; set; }

    public List<string>? Tags { get; set; }

    public bool Published { get; set; }

    public bool Featured { get; set; }

    public ProductStatus Status { get; set; }

    public Guid? BrandId { get; set; }

    public string? SEOTitle { get; set; }

    public string? SEODescription { get; set; }

    public string? Unit { get; set; }

    public decimal? Weight { get; set; }

    #endregion

    #region Factories

    public static ProductEntity Create(Guid id,
        string name,
        string sku,
        string shortDescription,
        string longDescription,
        string slug,
        decimal price,
        decimal? salePrice,
        List<Guid>? categoryIds,
        Guid? brandId,
        string performedBy)
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
            SalePrice = salePrice,
            Status = ProductStatus.OutOfStock,
            Published = false,
            CategoryIds = categoryIds,
            BrandId = brandId,
            CreatedBy = performedBy,
            LastModifiedBy = performedBy,
            CreatedOnUtc = DateTimeOffset.UtcNow,
            LastModifiedOnUtc = DateTimeOffset.UtcNow
        };

        return product;
    }

    #endregion

    #region Methods

    public void Update(string name,
        string sku,
        string shortDescription,
        string longDescription,
        string slug,
        decimal price,
        decimal? salePrice,
        List<Guid>? categoryIds,
        Guid? brandId,
        string performedBy)
    {
        Name = name;
        Sku = sku;
        ShortDescription = shortDescription;
        LongDescription = longDescription;
        Slug = slug;
        Price = price;
        SalePrice = salePrice;
        CategoryIds = categoryIds;
        BrandId = brandId;
        LastModifiedBy = performedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
    }

    public void AddOrUpdateImages(IEnumerable<ProductImageEntity>? newImgs = null, IEnumerable<string>? curentImageUrls = null)
    {
        if ((newImgs == null || !newImgs.Any()) &&
            (curentImageUrls == null || !curentImageUrls.Any())) return;

        Images ??= new List<ProductImageEntity>();

        var oldByUrl = Images
            .Where(i => !string.IsNullOrWhiteSpace(i.PublicURL))
            .ToDictionary(i => i.PublicURL!, StringComparer.OrdinalIgnoreCase);

        var keepOld = (curentImageUrls ?? Enumerable.Empty<string>())
            .Where(u => !string.IsNullOrWhiteSpace(u) && oldByUrl.ContainsKey(u))
            .Select(u => oldByUrl[u]);

        var result = (newImgs ?? Enumerable.Empty<ProductImageEntity>())
            .Concat(keepOld)
            .GroupBy(i => string.IsNullOrWhiteSpace(i.FileId) ? i.PublicURL : i.FileId,
                     StringComparer.OrdinalIgnoreCase)
            .Select(g => g.First())
            .ToList();

        Images = result;
    }

    public void AddOrUpdateThumbnail(ProductImageEntity? newImg = null, string? curentImageUrl = null)
    {
        if (newImg == null && string.IsNullOrWhiteSpace(curentImageUrl))
        {
            return;
        }

        if (Thumbnail != null &&
            !string.IsNullOrWhiteSpace(Thumbnail.PublicURL) &&
            Thumbnail.PublicURL!.Equals(curentImageUrl, StringComparison.OrdinalIgnoreCase))
        {
            return;
        }

        Thumbnail = newImg;
    }

    public void Publish(string performedBy)
    {
        Published = true;
        LastModifiedBy = performedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
    }

    public void Unpublish(string performedBy)
    {
        Published = false;
        LastModifiedBy = performedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
    }

    public void ChangeStatus(ProductStatus status, string performedBy)
    {
        if (Status == status)
        {
            throw new DomainException(MessageCode.DecisionFlowIllegal);
        }

        Status = status;
        LastModifiedBy = performedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
    }

    public void UpdateFeatured(bool featured, string performedBy)
    {
        Featured = featured;
        LastModifiedBy = performedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
    }

    public void UpdateSEO(string? seoTitle, string? seoDescription, string performedBy)
    {
        SEOTitle = seoTitle;
        SEODescription = seoDescription;
        LastModifiedBy = performedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
    }

    public void UpdateColors(List<string>? colors, string performedBy)
    {
        Colors = colors;
        LastModifiedBy = performedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
    }

    public void UpdateSizes(List<string>? sizes, string performedBy)
    {
        Sizes = sizes;
        LastModifiedBy = performedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
    }

    public void UpdateTags(List<string>? tags, string performedBy)
    {
        Tags = tags;
        LastModifiedBy = performedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
    }

    public void UpdateBarcode(string? barcode, string performedBy)
    {
        Barcode = barcode;
        LastModifiedBy = performedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
    }

    public void UpdateUnitAndWeight(string? unit, decimal? weight, string performedBy)
    {
        Unit = unit;
        Weight = weight;
        LastModifiedBy = performedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
    }

    #endregion
}
