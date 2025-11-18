namespace Basket.Application.Models.Responses.Externals;

public class ApplyCouponResponse
{
    #region Fields, Properties and Indexers

    public decimal OriginalAmount { get; init; }

    public decimal DiscountAmount { get; init; }

    public decimal FinalAmount { get; init; }

    public string CouponCode { get; init; } = string.Empty;

    #endregion
}
