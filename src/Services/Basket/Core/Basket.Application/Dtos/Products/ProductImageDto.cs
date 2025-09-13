namespace Basket.Application.Dtos.Products;

public class ProductImageDto
{
    #region Fields, Properties and Indexers

    public string? FileId { get; set; }

    public string? OriginalFileName { get; set; }

    public string? FileName { get; set; }

    public string? PublicURL { get; set; }

    #endregion
}

public class PublishProductImageDto
{
    #region Fields, Properties and Indexers

    public string? FileName { get; set; }

    public string? PublicURL { get; set; }

    #endregion
}