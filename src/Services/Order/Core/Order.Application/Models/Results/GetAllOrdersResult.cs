#region using

using Order.Application.Dtos.Orders;

#endregion

namespace Order.Application.Models.Results;

public sealed class GetAllOrdersResult
{
    #region Fields, Properties and Indexers

    public List<OrderDto> Items { get; init; }

    #endregion

    #region Ctors

    public GetAllOrdersResult(List<OrderDto> items)
    {
        Items = items;
    }

    #endregion
}