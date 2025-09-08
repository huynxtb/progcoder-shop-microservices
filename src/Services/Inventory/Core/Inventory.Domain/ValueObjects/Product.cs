namespace Inventory.Domain.ValueObjects;

public sealed class Product
{
    #region Fields, Properties and Indexers

    public Guid Id { get; private set; }

    public string? Name { get; private set; }

    #endregion

    #region Ctors

    private Product() { }

    #endregion

    #region Methods

    public static Product Of(Guid id, string name)
    {
        if (id == Guid.Empty) throw new ArgumentNullException(nameof(id));
        if (string.IsNullOrWhiteSpace(name)) throw new ArgumentNullException(nameof(name));

        return new Product
        {
            Id = id,
            Name = name
        };
    }

    #endregion
}
