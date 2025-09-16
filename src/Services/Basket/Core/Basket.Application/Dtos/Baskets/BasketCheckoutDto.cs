namespace Basket.Application.Dtos.Baskets;

public class BasketCheckoutDto
{
    #region Fields, Properties and Indexers

    public Guid BasketId { get; init; }

    public string UserId { get; init; } = default!;

    public BasketCheckoutCustomerDto Customer { get; init; } = default!;

    public BasketCheckoutAddressDto ShippingAddress { get; init; } = default!;

    public IReadOnlyCollection<BasketCheckoutItemDto> Items { get; init; } = Array.Empty<BasketCheckoutItemDto>();

    public decimal TotalPrice { get; init; }

    #endregion
}
