#region using

using Catalog.Application.Dtos.Abstractions;

#endregion

namespace Catalog.Application.Dtos.Products;

public class UpdateProductDto
{
    #region Fields, Properties and Indexers

    public string? Name { get; set; }

    public string? Sku { get; set; }

    public string? ShortDescription { get; set; }

    public string? LongDescription { get; set; }

    public decimal Price { get; set; }

    public decimal? SalePrice { get; set; }

    public List<Guid>? CategoryIds { get; set; }

    public List<string>? CurrentImageUrls { get; set; }

    public List<UploadFileBytes>? UploadImages { get; set; }

    public UploadFileBytes? UploadThumbnail { get; set; }

    public string? CurrentThumbnailUrl { get; set; }

    public Guid? BrandId { get; set; }

    public List<string>? Colors { get; set; }

    public List<string>? Sizes { get; set; }

    public List<string>? Tags { get; set; }

    public bool Published { get; set; }

    public bool Featured { get; set; }

    public string? SEOTitle { get; set; }

    public string? SEODescription { get; set; }

    public string? Barcode { get; set; }

    public string? Unit { get; set; }

    public decimal? Weight { get; set; }

    #endregion
}
