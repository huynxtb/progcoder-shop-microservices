#region using

using Discount.Domain.Enums;

#endregion

namespace Discount.Application.Dtos.Coupons;

public sealed class UpdateCouponDto
{
    #region Fields, Properties and Indexers

    public string? Description { get; init; }

    public double? Value { get; init; }

    public int? MaxUses { get; init; }

    public decimal? MaxDiscountAmount { get; init; }

    public DateTime? ValidFrom { get; init; }

    public DateTime? ValidTo { get; init; }

    #endregion
}

