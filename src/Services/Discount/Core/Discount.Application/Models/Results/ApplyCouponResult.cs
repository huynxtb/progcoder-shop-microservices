namespace Discount.Application.Models.Results;

public sealed class ApplyCouponResult
{
    #region Fields, Properties and Indexers

    public string CouponCode { get; init; } = string.Empty;

    #endregion

    #region Ctors

    public ApplyCouponResult(string couponCode)
    {
        CouponCode = couponCode;
    }

    #endregion
}

