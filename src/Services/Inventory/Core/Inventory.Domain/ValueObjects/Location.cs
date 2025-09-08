namespace Inventory.Domain.ValueObjects;

public sealed class Location
{
    #region Fields, Properties and Indexers

    public string? Address { get; private set; }

    #endregion

    #region Ctors

    private Location() { }

    #endregion

    #region Methods

    public static Location Of(string? address)
    {
        if (string.IsNullOrWhiteSpace(address)) throw new ArgumentException(nameof(address));

        return new Location
        {
            Address = address
        };
    }

    #endregion
}
