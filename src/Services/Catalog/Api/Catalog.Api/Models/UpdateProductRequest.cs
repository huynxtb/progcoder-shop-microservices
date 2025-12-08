namespace Catalog.Api.Models;

public sealed class UpdateProductRequest
{
    #region Fields, Properties and Indexers

    public string? Name { get; set; }

    public string? Sku { get; set; }

    public string? ShortDescription { get; set; }

    public string? LongDescription { get; set; }

    public decimal Price { get; set; }

    public decimal? SalePrice { get; set; }

    public List<string>? CategoryIds { get; set; }

    public List<string>? CurrentImageUrls { get; set; }

    public List<IFormFile>? ImageFiles { get; set; }

    public IFormFile? ThumbnailFile { get; set; }

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
