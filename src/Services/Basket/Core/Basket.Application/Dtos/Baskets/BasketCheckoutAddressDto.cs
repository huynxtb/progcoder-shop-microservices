namespace Basket.Application.Dtos.Baskets;

public sealed record BasketCheckoutAddressDto
{
    #region Fields, Properties and Indexers

    public string AddressLine { get; init; } = default!;

    public string Subdivision { get; init; } = default!;

    public string City { get; init; } = default!;

    public string StateOrProvince { get; init; } = default!;

    public string Country { get; init; } = default!;

    public string PostalCode { get; init; } = default!;

    #endregion
}


