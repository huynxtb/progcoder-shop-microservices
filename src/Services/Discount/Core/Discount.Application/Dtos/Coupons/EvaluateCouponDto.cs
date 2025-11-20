namespace Discount.Application.Dtos.Coupons;

public class EvaluateCouponDto
{
    #region Fields, Properties and Indexers

    public string Code { get; init; } = string.Empty;

    public decimal Amount { get; init; }

    #endregion
}
