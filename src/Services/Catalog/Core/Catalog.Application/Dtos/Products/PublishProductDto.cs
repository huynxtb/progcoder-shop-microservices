namespace Catalog.Application.Dtos.Products;

public class PublishProductDto : ProductInfoDto
{
    #region Fields, Properties and Indexers

    public List<PublishProductImageDto>? Images { get; set; }

    #endregion
}
