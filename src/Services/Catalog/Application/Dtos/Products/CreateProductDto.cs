#region using

using Catalog.Application.Dtos.Products;
using Catalog.Domain.Enums;

#endregion

namespace Catalog.Application.Dtos.Users;

public class CreateProductDto
{
    #region Fields, Properties and Indexers

    public string? Name { get; set; }

    public string? Sku { get; set; }

    public string? ShortDescription { get; set; }

    public string? LongDescription { get; set; }

    public string? Slug { get; set; }

    public decimal Price { get; set; }

    public decimal? SalesPrice { get; set; }

    public List<string>? CategoryIds { get; set; }

    public List<ProductImageFileDto>? Files { get; set; }

    #endregion
}
