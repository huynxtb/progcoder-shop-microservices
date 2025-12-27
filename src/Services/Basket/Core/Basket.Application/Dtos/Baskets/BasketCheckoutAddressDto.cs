namespace Basket.Application.Dtos.Baskets;

public sealed record BasketCheckoutAddressDto
{
    public string AddressLine { get; init; } = default!;

    public string Ward { get; init; } = default!;

    public string District { get; init; } = default!;

    public string City { get; init; } = default!;

    public string Country { get; init; } = default!;

    public string State { get; init; } = default!;

    public string ZipCode { get; init; } = default!;
}


