#region using

using Order.Application.Dtos.Orders;

#endregion

namespace Order.Application.Models.Results;

public sealed class GetOrderByOrderNoResult
{
    #region Fields, Properties and Indexers

    public OrderDto Order { get; init; }

    #endregion

    #region Ctors

    public GetOrderByOrderNoResult(OrderDto order)
    {
        Order = order;
    }

    #endregion
}