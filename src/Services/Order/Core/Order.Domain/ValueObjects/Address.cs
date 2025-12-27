namespace Order.Domain.ValueObjects;

public class Address
{
    #region Fields, Properties and Indexers

    public string AddressLine { get; } = default!;

    public string Ward { get; } = default!;

    public string District { get; set; } = default!;

    public string City { get; set; } = default!;

    public string Country { get; } = default!;

    public string State { get; } = default!;

    public string ZipCode { get; } = default!;

    #endregion

    #region Ctors

    private Address(string addressLine, string ward, string district, string city, string country, string state, string zipCode)
    {
        AddressLine = addressLine;
        Ward = ward;
        District = district;
        City = city;
        Country = country;
        State = state;
        ZipCode = zipCode;
    }

    #endregion

    #region Methods

    public static Address Of(
        string addressLine, 
        string ward, 
        string district, 
        string city, 
        string country, 
        string state, 
        string zipCode)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(addressLine);

        return new Address(addressLine, ward, district, city, country, state, zipCode);
    }

    #endregion
}
