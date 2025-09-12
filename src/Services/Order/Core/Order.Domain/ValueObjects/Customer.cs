namespace Order.Domain.ValueObjects;

public record Customer
{
    #region Fields, Properties and Indexers

    public Guid? Id { get; private set; }

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

    public static Customer Of(Guid? id, string phoneNumber, string name, string email)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(phoneNumber);
        ArgumentException.ThrowIfNullOrWhiteSpace(name);
        ArgumentException.ThrowIfNullOrWhiteSpace(email);

        return new Customer
        {
            Id = id,
            PhoneNumber = phoneNumber,
            Name = name,
            Email = email
        };
    }

    #endregion
}
