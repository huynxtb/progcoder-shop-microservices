#region using

using Order.Application.Dtos.Orders;

#endregion

namespace Order.Application.Models.Results;

public sealed class GetOrderByMonthResult
{
    #region Fields, Properties and Indexers

    public List<OrderDto> Items { get; init; }

    #endregion

    #region Ctors

    public GetOrderByMonthResult(List<OrderDto> items)
    {
        Items = items;
    }

    #endregion
}
