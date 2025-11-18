namespace Order.Domain.ValueObjects;

public class Product
{
    #region Fields, Properties and Indexers

    public Guid Id { get; set; } = default!;

    public string Name { get; set; } = default!;

    public string ImageUrl { get; set; } = default!;

    public decimal Price { get; set; } = default!;

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
