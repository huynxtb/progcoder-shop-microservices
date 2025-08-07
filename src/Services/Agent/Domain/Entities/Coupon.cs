#region using

using Domain.Abstractions;

#endregion

namespace Domain.Entities;

public class Coupon : Entity<Guid>
{
    #region Fields, Properties and Indexers

    public string Code { get; set; } = default!;

    public string Detail { get; set; } = default!;

    public decimal Discount { get; set; }

    public decimal LimitDiscountAmount { get; set; }

    public DateTime ExpiredDatetime { get; set; }

    #endregion
}
