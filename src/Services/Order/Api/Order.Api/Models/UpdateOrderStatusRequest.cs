#region using

using Order.Domain.Enums;

#endregion

namespace Order.Api.Models;

public sealed class UpdateOrderStatusRequest
{
    #region Fields, Properties and Indexers

    public OrderStatus Status { get; set; }

    public string? Reason { get; set; }

    #endregion
}

