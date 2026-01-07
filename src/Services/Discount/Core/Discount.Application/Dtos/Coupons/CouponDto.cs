#region using

using Discount.Application.Dtos.Abstractions;
using Discount.Domain.Enums;

#endregion

namespace Discount.Application.Dtos.Coupons;

public sealed class CouponDto : EntityDto<Guid>
{
    #region Fields, Properties and Indexers

    public string Code { get; set; } = default!;

    public string Name { get; set; } = default!;

    public string? Description { get; set; }

    public CouponType Type { get; set; }

    public string DisplayType { get; set; } = default!;

    public double Value { get; set; }

    public int MaxUsage { get; set; }

    public int UsageCount { get; set; }

    public decimal? MaxDiscountAmount { get; set; }

    public decimal? MinPurchaseAmount { get; set; }

    public CouponStatus Status { get; set; }

    public string DisplayStatus { get; set; } = default!;

    public DateTime ValidFrom { get; set; }

    public DateTime ValidTo { get; set; }

    public bool IsValid { get; set; }

    public bool IsExpired { get; set; }

    public bool IsOutOfUses { get; set; }

    #endregion
}

