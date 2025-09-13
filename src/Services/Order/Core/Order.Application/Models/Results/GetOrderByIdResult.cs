#region using

using Order.Application.Dtos.Orders;

#endregion

namespace Order.Application.Models.Results;

public sealed class GetOrderByIdResult
{
    #region Fields, Properties and Indexers

    public OrderDto Order { get; init; }

    #endregion

    #region Ctors

    public GetOrderByIdResult(OrderDto order)
    {
        Order = order;
    }

    #endregion
}