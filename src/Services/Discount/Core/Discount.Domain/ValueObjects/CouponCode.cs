namespace Discount.Domain.ValueObjects;

public class CouponCode
{
    #region Fields, Properties and Indexers

    public string Value { get; }

    #endregion

    #region Ctors

    private CouponCode(string value) => Value = value;

    #endregion

    #region Methods

    public static CouponCode Create(string code)
    {
        return new CouponCode(code);
    }

    public override string ToString() => Value;

    #endregion
}