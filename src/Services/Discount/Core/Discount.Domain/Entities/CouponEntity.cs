#region using

using Discount.Domain.Abstractions;
using Discount.Domain.Enums;

#endregion

namespace Discount.Domain.Entities;

public sealed class CouponEntity : Aggregate<Guid>
{
    #region Fields, Properties and Indexers

    public string Code { get; set; } = default!;

    public string Name { get; set; } = default!;

    public string? Description { get; set; }

    public CouponType Type { get; set; }

    public double Value { get; set; }

    public int MaxUsage { get; set; }

    public int UsageCount { get; set; }

    public decimal? MaxDiscountAmount { get; set; }

    public decimal? MinPurchaseAmount { get; set; }

    public CouponStatus Status { get; set; }

    public DateTime ValidFrom { get; set; }

    public DateTime ValidTo { get; set; }

    #endregion

    #region Factories

    public static CouponEntity Create(Guid id,
        string code,
        string name,
        string description,
        CouponType type,
        double value,
        int maxUsage,
        decimal? maxDiscountAmount,
        decimal? minPurchaseAmount,
        DateTime validFrom,
        DateTime validTo,
        string performBy)
    {
        ArgumentNullException.ThrowIfNull(code);
        ArgumentException.ThrowIfNullOrWhiteSpace(description);
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(value);
        ArgumentOutOfRangeException.ThrowIfNegative(maxUsage);

        if (maxDiscountAmount.HasValue && maxDiscountAmount.Value < 0)
            throw new ArgumentException("MaxDiscountAmount cannot be negative", nameof(maxDiscountAmount));

        if (validFrom >= validTo)
            throw new ArgumentException("ValidFrom must be before ValidTo", nameof(validTo));

        if (type == CouponType.Percentage && value > 100)
            throw new ArgumentException("Percentage value cannot exceed 100", nameof(value));

        return new CouponEntity()
        {
            Id = id,
            Code = code,
            Name = name,
            Description = description,
            Type = type,
            Value = value,
            MaxUsage = maxUsage,
            MaxDiscountAmount = maxDiscountAmount,
            MinPurchaseAmount = minPurchaseAmount,
            Status = CouponStatus.Pending,
            ValidFrom = validFrom,
            ValidTo = validTo,
            CreatedOnUtc = DateTimeOffset.UtcNow,
            CreatedBy = performBy,
            LastModifiedOnUtc = DateTimeOffset.UtcNow,
            LastModifiedBy = performBy
        };
    }

    #endregion

    #region Methods

    public void Update(string name,
        string? description,
        CouponType type,
        double value,
        int maxUsage,
        decimal? maxDiscountAmount,
        decimal? minPurchaseAmount,
        string performBy)
    {
        Name = name;
        Description = description;
        Type = type;
        Value = value;
        MaxUsage = maxUsage;
        MaxDiscountAmount = maxDiscountAmount;
        MinPurchaseAmount = minPurchaseAmount;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
        LastModifiedBy = performBy;
    }

    public void Approve(string performBy)
    {
        if (Status != CouponStatus.Pending)
            throw new InvalidOperationException("Only pending coupons can be approved");

        Status = CouponStatus.Approved;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
        LastModifiedBy = performBy;
    }

    public void Reject(string performBy)
    {
        if (Status != CouponStatus.Pending)
            throw new InvalidOperationException("Only pending coupons can be rejected");

        Status = CouponStatus.Rejected;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
        LastModifiedBy = performBy;
    }

    public void Apply()
    {
        if (!CanBeUsed())
            throw new InvalidOperationException("Coupon cannot be used");

        UsageCount++;

        if (UsageCount >= MaxUsage)
            Status = CouponStatus.OutOfStock;
    }

    public decimal CalculateDiscount(decimal originalAmount)
    {
        ArgumentOutOfRangeException.ThrowIfNegative(originalAmount);

        decimal discount;

        if (Type == CouponType.Fixed)
        {
            discount = (decimal)Value > originalAmount ? originalAmount : (decimal)Value;
        }
        else // Percentage
        {
            discount = originalAmount * (decimal)(Value / 100.0);
            discount = discount > originalAmount ? originalAmount : discount;
        }

        // Apply MaxDiscountAmount limit if specified
        if (MaxDiscountAmount.HasValue && discount > MaxDiscountAmount.Value)
        {
            discount = MaxDiscountAmount.Value;
        }

        // Ensure discount doesn't exceed original amount
        return discount > originalAmount ? originalAmount : discount;
    }

    public void UpdateValidityPeriod(DateTime validFrom, DateTime validTo, string performBy)
    {
        if (validFrom >= validTo)
            throw new ArgumentException("ValidFrom must be before ValidTo", nameof(validTo));

        ValidFrom = validFrom;
        ValidTo = validTo;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
        LastModifiedBy = performBy;
    }

    public bool IsValid()
    {
        return Status == CouponStatus.Approved
            && DateTime.UtcNow >= ValidFrom
            && DateTime.UtcNow <= ValidTo
            && UsageCount < MaxUsage;
    }

    public bool CanBeUsed()
    {
        return IsValid();
    }

    public bool IsExpired()
    {
        return DateTime.UtcNow > ValidTo;
    }

    public bool IsOutOfUses()
    {
        return UsageCount >= MaxUsage;
    }

    #endregion
}
