#region using

using Catalog.Application.Dtos.Products;

#endregion

namespace Catalog.Api.Models;

public sealed class CreateProductRequest
{
    #region Fields, Properties and Indexers

    public string? Name { get; set; }

    public string? Sku { get; set; }

    public string? ShortDescription { get; set; }

    public string? LongDescription { get; set; }

    public string? Slug { get; set; }

    public decimal Price { get; set; }

    public decimal? SalesPrice { get; set; }

    public List<IFormFile>? FormFiles { get; set; }

    #endregion
}
