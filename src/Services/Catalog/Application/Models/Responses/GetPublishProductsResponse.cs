#region using

using Catalog.Application.Dtos.Products;
using SourceCommon.Models.Reponses;

#endregion

namespace Catalog.Application.Models.Responses;

public sealed class GetPublishProductsResponse
{
    #region Fields, Properties and Indexers

    public List<PublishProductDto>? Items { get; set; }

    public PaginationResponse Paging { get; set; } = new();

    #endregion
}
