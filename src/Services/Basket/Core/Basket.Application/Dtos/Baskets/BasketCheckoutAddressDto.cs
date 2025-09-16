namespace Basket.Application.Dtos.Baskets;

public sealed record BasketCheckoutAddressDto
{
    public string Name { get; init; } = default!;

    public string EmailAddress { get; init; } = default!;

    public string AddressLine { get; init; } = default!;

    public string Country { get; init; } = default!;

    public string State { get; init; } = default!;

    public string ZipCode { get; init; } = default!;
}


