#region using

using Order.Application.Dtos.Orders;
using Common.Models.Reponses;

#endregion

namespace Order.Application.Models.Results;

public sealed class GetMyOrdersResult
{
    #region Fields, Properties and Indexers

    public List<OrderDto> Items { get; init; }

    public PagingResult Paging { get; init; }

    #endregion

    #region Ctors

    public GetMyOrdersResult(
        List<OrderDto> items,
        long totalItems,
        PaginationRequest pagination)
    {
        Items = items;
        Paging = PagingResult.Of(totalItems, pagination);
    }

    #endregion
}