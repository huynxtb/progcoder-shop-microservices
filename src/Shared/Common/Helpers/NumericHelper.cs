namespace Common.Helpers;

public static class NumericHelper
{
    #region Methods

    public static int CalculateDiscountPercent(double originalPrice, double salePrice)
    {
        double discountAmount = originalPrice - salePrice;
        double discountPercent = (discountAmount / originalPrice) * 100;
        return (int)discountPercent;
    }

    #endregion
}