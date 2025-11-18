#region using

using Discount.Domain.Abstractions;
using Discount.Domain.Enums;

#endregion

namespace Discount.Domain.Entities;

public sealed class CouponEntity : Aggregate<Guid>
{
    #region Fields, Properties and Indexers

    public string Code { get; set; }

    public string Description { get; set; }

    public CouponType Type { get; set; }

    public double Value { get; set; }

    public int MaxUses { get; set; }

    public int UsesCount { get; set; }

    public decimal? MaxDiscountAmount { get; set; }

    public CouponStatus Status { get; set; }

    public DateTime ValidFrom { get; set; }

    public DateTime ValidTo { get; set; }

    #endregion

    #region Ctors

    private CouponEntity(
        string code,
        string description,
        CouponType type,
        double value,
        int maxUses,
        decimal? maxDiscountAmount,
        DateTime validFrom,
        DateTime validTo)
    {
        Id = Guid.NewGuid();
        Code = code;
        Description = description;
        Type = type;
        Value = value;
        MaxUses = maxUses;
        UsesCount = 0;
        MaxDiscountAmount = maxDiscountAmount;
        Status = CouponStatus.Pending;
        ValidFrom = validFrom;
        ValidTo = validTo;
    }

    #endregion

    #region Factories

    public static CouponEntity Create(
        string code,
        string description,
        CouponType type,
        double value,
        int maxUses,
        decimal? maxDiscountAmount,
        DateTime validFrom,
        DateTime validTo)
    {
        ArgumentNullException.ThrowIfNull(code);
        ArgumentException.ThrowIfNullOrWhiteSpace(description);
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(value);
        ArgumentOutOfRangeException.ThrowIfNegative(maxUses);
        
        if (maxDiscountAmount.HasValue && maxDiscountAmount.Value < 0)
            throw new ArgumentException("MaxDiscountAmount cannot be negative", nameof(maxDiscountAmount));
        
        if (validFrom >= validTo)
            throw new ArgumentException("ValidFrom must be before ValidTo", nameof(validTo));

        if (type == CouponType.Percentage && value > 100)
            throw new ArgumentException("Percentage value cannot exceed 100", nameof(value));

        return new CouponEntity(code, description, type, value, maxUses, maxDiscountAmount, validFrom, validTo);
    }

    #endregion

    #region Operations

    public void Approve()
    {
        if (Status != CouponStatus.Pending)
            throw new InvalidOperationException("Only pending coupons can be approved");

        Status = CouponStatus.Approved;
    }

    public void Reject()
    {
        if (Status != CouponStatus.Pending)
            throw new InvalidOperationException("Only pending coupons can be rejected");

        Status = CouponStatus.Rejected;
    }

    public void Apply()
    {
        if (!CanBeUsed())
            throw new InvalidOperationException("Coupon cannot be used");

        UsesCount++;
        
        if (UsesCount >= MaxUses)
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

    public void UpdateDescription(string description)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(description);
        Description = description;
    }

    public void UpdateValue(double value)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(value);

        if (Type == CouponType.Percentage && value > 100)
            throw new ArgumentException("Percentage value cannot exceed 100", nameof(value));

        Value = value;
    }

    public void UpdateValidityPeriod(DateTime validFrom, DateTime validTo)
    {
        if (validFrom >= validTo)
            throw new ArgumentException("ValidFrom must be before ValidTo", nameof(validTo));

        ValidFrom = validFrom;
        ValidTo = validTo;
    }

    public void UpdateMaxUses(int maxUses)
    {
        ArgumentOutOfRangeException.ThrowIfNegative(maxUses);
        
        if (maxUses < UsesCount)
            throw new ArgumentException("MaxUses cannot be less than current UsesCount", nameof(maxUses));

        MaxUses = maxUses;
    }

    public void UpdateMaxDiscountAmount(decimal? maxDiscountAmount)
    {
        if (maxDiscountAmount.HasValue && maxDiscountAmount.Value < 0)
            throw new ArgumentException("MaxDiscountAmount cannot be negative", nameof(maxDiscountAmount));

        MaxDiscountAmount = maxDiscountAmount;
    }

    #endregion

    #region Validation

    public bool IsValid()
    {
        return Status == CouponStatus.Approved
            && DateTime.UtcNow >= ValidFrom
            && DateTime.UtcNow <= ValidTo
            && UsesCount < MaxUses;
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
        return UsesCount >= MaxUses;
    }

    #endregion
}
