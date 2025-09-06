#region using

using Catalog.Domain.Abstractions;
using Catalog.Domain.Enums;
using Catalog.Domain.Exceptions;
using Common.Constants;
using System.Data;
using System.Text.Json.Serialization;

#endregion

namespace Catalog.Domain.Entities;

public sealed class ProductEntity : Entity<Guid>
{
    #region Fields, Properties and Indexers

    [JsonInclude]
    public string? Name { get; private set; }

    [JsonInclude]
    public string? Sku { get; private set; }

    [JsonInclude]
    public string? ShortDescription { get; private set; }

    [JsonInclude]
    public string? LongDescription { get; private set; }

    [JsonInclude]
    public string? Slug { get; private set; }

    [JsonInclude]
    public decimal Price { get; private set; }

    [JsonInclude]
    public decimal? SalesPrice { get; private set; }

    [JsonInclude]
    public List<Guid>? CategoryIds { get; private set; }

    [JsonInclude]
    public List<ProductImageEntity>? Images { get; private set; }

    [JsonInclude]
    public bool Published { get; private set; }

    [JsonInclude]
    public ProductStatus Status { get; private set; }

    #endregion

    #region Ctors

    [JsonConstructor]
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
            SalesPrice = salesPrice,
            Status = ProductStatus.OutOfStock,
            Published = false,
            CategoryIds = categoryIds,
            CreatedBy = performedBy,
            LastModifiedBy = performedBy,
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
        string performedBy)
    {
        Name = name;
        Sku = sku;
        ShortDescription = shortDescription;
        LongDescription = longDescription;
        Slug = slug;
        Price = price;
        SalesPrice = salesPrice;
        CategoryIds = categoryIds;
        LastModifiedBy = performedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
    }

    public void AddOrUpdateImages(
        IEnumerable<ProductImageEntity>? newImgs = null,
        IEnumerable<string>? curentImageUrls = null)
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


    public void Publish(string performedBy)
    {
        if (Published)
        {
            throw new DomainException(MessageCode.DecisionFlowIllegal);
        }

        Published = true;
        LastModifiedBy = performedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
    }

    public void Unpublish(string performedBy)
    {
        if (!Published)
        {
            throw new DomainException(MessageCode.DecisionFlowIllegal);
        }

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

    #endregion
}
