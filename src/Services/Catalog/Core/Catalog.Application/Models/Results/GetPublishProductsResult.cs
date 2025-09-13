#region using

using Catalog.Application.Dtos.Products;
using Common.Models.Reponses;

#endregion

namespace Catalog.Application.Models.Results;

public sealed class GetPublishProductsResult
{
    #region Fields, Properties and Indexers

    public List<PublishProductDto> Items { get; init; }

    public PagingResult Paging { get; init; }

    #endregion

    #region Ctors

    public GetPublishProductsResult(
        List<PublishProductDto> items,
        long totalCount,
        PaginationRequest pagination)
    {
        Items = items;
        Paging = PagingResult.Of(totalCount, pagination);
    }

    #endregion
}
