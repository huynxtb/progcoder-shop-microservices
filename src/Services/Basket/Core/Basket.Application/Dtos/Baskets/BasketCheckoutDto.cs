namespace Basket.Application.Dtos.Baskets;

public class BasketCheckoutDto
{
    #region Fields, Properties and Indexers

    public BasketCheckoutCustomerDto Customer { get; set; } = default!;

    public BasketCheckoutAddressDto ShippingAddress { get; set; } = default!;

    public string? CouponCode { get; set; }

    #endregion
}
