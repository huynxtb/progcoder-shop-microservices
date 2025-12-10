#region using

using Discount.Domain.Enums;

#endregion

namespace Discount.Application.Dtos.Coupons;

public sealed class UpdateCouponDto
{
    #region Fields, Properties and Indexers

    public string Name { get; set; } = default!;

    public string? Description { get; set; }

    public double Value { get; set; }

    public int MaxUsage { get; set; }

    public decimal? MaxDiscountAmount { get; set; }

    public decimal? MinPurchaseAmount { get; set; }

    public CouponType Type { get; set; }

    #endregion
}

