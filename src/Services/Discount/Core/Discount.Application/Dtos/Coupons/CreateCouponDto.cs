#region using

using Discount.Domain.Enums;

#endregion

namespace Discount.Application.Dtos.Coupons;

public sealed class CreateCouponDto
{
    #region Fields, Properties and Indexers

    public string Code { get; init; } = string.Empty;

    public string Name { get; set; } = default!;

    public string Description { get; init; } = string.Empty;

    public CouponType Type { get; init; }

    public double Value { get; init; }

    public int MaxUsage { get; init; }

    public decimal? MaxDiscountAmount { get; init; }

    public decimal? MinPurchaseAmount { get; init; }

    public DateTime ValidFrom { get; init; }

    public DateTime ValidTo { get; init; }

    #endregion
}

