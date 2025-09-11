#region using

using Catalog.Application.Dtos.Products;

#endregion

namespace Catalog.Application.Models.Responses;

public sealed class GetAllProductsResponse
{
    #region Fields, Properties and Indexers

    public List<ProductDto>? Items { get; set; }

    #endregion

    #region Ctors

    public GetAllProductsResponse(List<ProductDto> items)
    {
        Items = items;
    }

    #endregion
}
