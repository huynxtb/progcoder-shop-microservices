#region using

using Catalog.Application.Dtos.Abstractions;

#endregion

namespace Catalog.Application.Dtos.Products;

public class ProductDto : ProductInfoDto, IAuditableDto
{
    #region Fields, Properties and Indexers

    public List<ProductImageDto>? Images {  get; set; }

    public DateTimeOffset CreatedOnUtc { get; set; }

    public string? CreatedBy { get; set; }

    public DateTimeOffset? LastModifiedOnUtc { get; set; }

    public string? LastModifiedBy { get; set; }

    #endregion
}
