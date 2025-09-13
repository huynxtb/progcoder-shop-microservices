namespace Basket.Domain.Entities;

public sealed class ShoppingCartItemEntity
{
    #region Fields, Properties and Indexers

    public int Quantity { get; set; } = default!;

    public string Color { get; set; } = default!;

    public decimal Price { get; set; } = default!;

    public Guid ProductId { get; set; } = default!;

    public string ProductName { get; set; } = default!;

    #endregion

}
