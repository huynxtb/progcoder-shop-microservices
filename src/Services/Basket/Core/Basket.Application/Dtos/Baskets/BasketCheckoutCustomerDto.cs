namespace Basket.Application.Dtos.Baskets;

public sealed record BasketCheckoutCustomerDto
{
    public string Name { get; init; } = default!;

    public string Email { get; init; } = default!;

    public string PhoneNumber { get; init; } = default!;
}


