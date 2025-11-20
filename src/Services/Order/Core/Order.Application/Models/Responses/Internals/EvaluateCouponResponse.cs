namespace Order.Application.Models.Responses.Internals;

public sealed class EvaluateCouponResponse
{
    #region Fields, Properties and Indexers

    public decimal OriginalAmount { get; init; }

    public decimal DiscountAmount { get; init; }

    public decimal FinalAmount { get; init; }

    public string CouponCode { get; init; } = string.Empty;

    #endregion
}
