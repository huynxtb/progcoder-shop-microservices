namespace Order.Domain.ValueObjects;

public record Product
{
    #region Fields, Properties and Indexers

    public Guid Id { get; private set; } = default!;

    public string Name { get; private set; } = default!;

    public string ImageUrl { get; private set; } = default!;

    public decimal Price { get; private set; } = default!;

    #endregion

    #region Ctors

    private Product() { }

    #endregion

    #region Methods

    public static Product Of(Guid id, string name, decimal price, string imageUrl)
    {
        ArgumentException.ThrowIfNullOrWhiteSpace(name);

        return new Product()
        {
            Id = id,
            Name = name,
            Price = price,
            ImageUrl = imageUrl
        };
    }

    #endregion

}
