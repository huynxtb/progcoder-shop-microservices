#region using

using Order.Domain.Enums;

#endregion

namespace Order.Application.Models.Filters;

public class GetOrdersFilter
{
    #region Fields, Properties and Indexers

    public string? SearchText { get; set; }

    public Guid[]? Ids { get; set; }

    public Guid? CustomerId { get; set; }

    public OrderStatus? Status { get; set; }

    public DateTime? FromDate { get; set; }

    public DateTime? ToDate { get; set; }

    #endregion
}