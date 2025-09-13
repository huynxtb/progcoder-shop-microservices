namespace Basket.Application.Dtos.Baskets;

public class ShoppingCartItemDto
{
    #region Fields, Properties and Indexers

    public int Quantity { get; set; } = default!;

    public decimal Price { get; set; } = default!;

    public Guid ProductId { get; set; } = default!;

    public string ProductName { get; set; } = default!;

    public string ProductSlug { get; set; } = default!;

    public string ProductImage { get; set; } = default!;

    #endregion
}
