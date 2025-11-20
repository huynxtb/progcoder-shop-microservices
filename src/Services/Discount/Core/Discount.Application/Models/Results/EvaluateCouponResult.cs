namespace Discount.Application.Models.Results;

public sealed class EvaluateCouponResult
{
    #region Fields, Properties and Indexers

    public decimal OriginalAmount { get; init; }

    public decimal DiscountAmount { get; init; }

    public decimal FinalAmount { get; init; }

    public string CouponCode { get; init; } = string.Empty;

    #endregion

    #region Ctors

    public EvaluateCouponResult(decimal originalAmount, decimal discountAmount, string couponCode)
    {
        OriginalAmount = originalAmount;
        DiscountAmount = discountAmount;
        FinalAmount = originalAmount - discountAmount;
        CouponCode = couponCode;
    }

    #endregion
}