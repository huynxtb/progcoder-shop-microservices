namespace Order.Domain.ValueObjects;

public class Address
{
    #region Fields, Properties and Indexers

    public string Name { get; } = default!;

    public string? EmailAddress { get; } = default!;

    public string AddressLine { get; } = default!;

    public string Country { get; } = default!;

    public string State { get; } = default!;

    public string ZipCode { get; } = default!;

    #endregion

    #region Ctors

    private Address(string name, string emailAddress, string addressLine, string country, string state, string zipCode)
    {
        Name = name;
        EmailAddress = emailAddress;
        AddressLine = addressLine;
        Country = country;
        State = state;
        ZipCode = zipCode;
    }

    #endregion

    #region Methods

    public static Address Of(
        string name, 
        string emailAddress, 
        string addressLine, 
        string country, 
        string state, 
        string zipCode)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(addressLine);

        return new Address(name, emailAddress, addressLine, country, state, zipCode);
    }

    #endregion
}
