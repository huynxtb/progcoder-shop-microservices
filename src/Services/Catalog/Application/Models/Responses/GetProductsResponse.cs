#region using

using Catalog.Application.Dtos.Products;
using SourceCommon.Models.Reponses;

#endregion

namespace Catalog.Application.Models.Responses;

public sealed class GetProductsResponse
{
    #region Fields, Properties and Indexers

    public List<ProductDto>? Items { get; set; }

    public PagingOptionReponse Paging { get; set; } = new();

    #endregion
}
