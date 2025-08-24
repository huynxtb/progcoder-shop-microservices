namespace Catalog.Domain.Entities;

public sealed class ProductImage
{
    #region Fields, Properties and Indexers

    public string? FileId { get; set; }

    public string? OriginalFileName { get; set; }

    public string? FileName { get; set; }

    public string? PublicURL { get; set; }

    #endregion
}
