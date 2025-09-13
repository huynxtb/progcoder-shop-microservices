#region using

using Order.Application.Dtos.Orders;

#endregion

namespace Order.Application.Models.Results;

public sealed class GetOrdersResult
{
    #region Fields, Properties and Indexers

    public List<OrderDto> Items { get; init; }

    public PagingResult Paging { get; init; }

    #endregion

    #region Ctors

    public GetOrdersResult(
        List<OrderDto> items,
        long totalCount,
        PaginationRequest pagination)
    {
        Items = items;
        Paging = PagingResult.Of(totalCount, pagination);
    }

    #endregion
}
