namespace Order.Domain.ValueObjects;

public class Address
{
    #region Fields, Properties and Indexers

    public string AddressLine { get; set; } = default!;

    public string Subdivision { get; set; } = default!; // Ward / County

    public string City { get; set; } = default!;

    public string StateOrProvince { get; set; } = default!;

    public string Country { get; set; } = default!;

    public string PostalCode { get; set; } = default!;

    #endregion

    #region Ctors

    private Address(string addressLine, string subdivision, string city, string country, string stateOrProvince, string postalCode)
    {
        AddressLine = addressLine;
        Subdivision = subdivision;
        City = city;
        Country = country;
        StateOrProvince = stateOrProvince;
        PostalCode = postalCode;
    }

    #endregion

    #region Methods

    public static Address Of(
        string addressLine,
        string subdivision,
        string city,
        string country,
        string stateOrProvince,
        string postalCode)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(addressLine);
        ArgumentException.ThrowIfNullOrWhiteSpace(subdivision);
        ArgumentException.ThrowIfNullOrWhiteSpace(city);
        ArgumentException.ThrowIfNullOrWhiteSpace(country);
        ArgumentException.ThrowIfNullOrWhiteSpace(stateOrProvince);
        ArgumentException.ThrowIfNullOrWhiteSpace(postalCode);

        return new Address(addressLine, subdivision, city, country, stateOrProvince, postalCode);
    }

    #endregion
}
