namespace Order.Domain.ValueObjects;

public record Customer
{
    #region Fields, Properties and Indexers

    public string PhoneNumber { get; private set; } = default!;

    public string Name { get; private set; } = default!;

    public string Email { get; private set; } = default!;

    #endregion

    #region Ctors

    protected Customer()
    {
    }

    #endregion

    #region Methods

    public static Customer Of(string phoneNumber, string name, string email)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(phoneNumber);
        ArgumentException.ThrowIfNullOrWhiteSpace(name);
        ArgumentException.ThrowIfNullOrWhiteSpace(email);

        return new Customer
        {
            PhoneNumber = phoneNumber,
            Name = name,
            Email = email
        };
    }

    #endregion
}
