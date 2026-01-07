namespace Inventory.Application.Models.Responses.Externals;

public class ProductReponse
{
    #region Fields, Properties and Indexers

    public Guid Id { get; set; }

    public string Name { get; set; } = default!;

    public ProductImageResponse Thumbnail { get; set; } = default!;

    public string ThumbnailUrl { get; set; } = default!;

    public decimal Price { get; set; }

    #endregion
}

public class ProductImageResponse
{
    #region Fields, Properties and Indexers

    public string? FileId { get; set; }

    public string? OriginalFileName { get; set; }

    public string? FileName { get; set; }

    public string? PublicURL { get; set; }

    #endregion
}