namespace Order.Application.Dtos.ValueObjects;

public class DiscountDto
{
    #region Fields, Properties and Indexers

    public string CouponCode { get; set; } = default!;

    public decimal DiscountAmount { get; set; }

    #endregion
}
