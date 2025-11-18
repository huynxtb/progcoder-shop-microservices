namespace Discount.Application.Dtos.Coupons;

public sealed class ApplyCouponDto
{
    #region Fields, Properties and Indexers

    public string Code { get; init; } = string.Empty;

    public decimal Amount { get; init; }

    #endregion
}

