namespace Order.Domain.ValueObjects;

public class Discount
{
    #region Fields, Properties and Indexers

    public string CouponCode { get; set; }

    public decimal DiscountAmount { get; set; }

    #endregion

    #region Ctors

    private Discount(string couponCode, decimal discountAmount)
    {
        CouponCode = couponCode;
        DiscountAmount = discountAmount;
    }

    #endregion

    #region Methods

    public static Discount Of(string couponCode, decimal discountAmount)
    {
        return new Discount(couponCode, discountAmount);
    }

    #endregion
}
