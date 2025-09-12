using Order.Application.Dtos.Orders;

namespace Order.Application.Models.Results;

public class GetOrdersResult
{
    #region Fields, Properties and Indexers

    public List<OrderDto> Items { get; init; }

    public PagingResult Paging { get; init; }

    #endregion

    #region Ctors

    public GetOrdersResult(
        List<OrderDto> items,
        long totalItems,
        int pageNumber,
        int pageSize)
    {
        Items = items;
        Paging = PagingResult.Of(totalItems, pageNumber, pageSize);
    }

    #endregion
}
