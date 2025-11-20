#region using

using Discount.Application.Dtos.Abstractions;
using Discount.Domain.Enums;
using Discount.Domain.ValueObjects;

#endregion

namespace Discount.Application.Dtos.Coupons;

public sealed class CouponDto : EntityDto<Guid>
{
    #region Fields, Properties and Indexers

    public string Code { get; init; } = string.Empty;

    public string Description { get; init; } = string.Empty;

    public CouponType Type { get; init; }

    public double Value { get; init; }

    public int MaxUses { get; init; }

    public int UsesCount { get; init; }

    public decimal? MaxDiscountAmount { get; init; }

    public CouponStatus Status { get; init; }

    public string DisplayStatus { get; set; } = default!;

    public DateTime ValidFrom { get; init; }

    public DateTime ValidTo { get; init; }

    public bool IsValid { get; init; }

    public bool IsExpired { get; init; }

    public bool IsOutOfUses { get; init; }

    #endregion
}

