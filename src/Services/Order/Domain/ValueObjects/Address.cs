namespace Order.Domain.ValueObjects;

public record Address
{
    #region Fields, Properties and Indexers

    public string FirstName { get; } = default!;

    public string LastName { get; } = default!;

    public string? EmailAddress { get; } = default!;

    public string AddressLine { get; } = default!;

    public string Country { get; } = default!;

    public string State { get; } = default!;

    public string ZipCode { get; } = default!;

    #endregion

    #region Ctors

    protected Address()
    {
    }

    #endregion

    #region Methods

    public static Address Of(
        string firstName, 
        string lastName, 
        string emailAddress, 
        string addressLine, 
        string country, 
        string state, 
        string zipCode)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(emailAddress);
        ArgumentException.ThrowIfNullOrWhiteSpace(addressLine);

        return new Address();
    }

    #endregion
}
