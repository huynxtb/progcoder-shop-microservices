namespace Inventory.Domain.ValueObjects;

public sealed class Location
{
    #region Fields, Properties and Indexers

    public string Code { get; } = default!;

    public string Address { get; } = default!;

    #endregion

    #region Ctors

    private Location(string code, string address)
    {
        Code = code;
        Address = address;
    }

    #endregion

    #region Methods

    public static Location Of(string code, string address)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(code);
        ArgumentException.ThrowIfNullOrWhiteSpace(address);

        return new Location(code, address);
    }

    #endregion
}
