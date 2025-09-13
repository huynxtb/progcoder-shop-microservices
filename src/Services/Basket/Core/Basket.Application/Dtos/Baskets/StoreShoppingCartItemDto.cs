namespace Basket.Application.Dtos.Baskets;

public sealed class StoreShoppingCartItemDto
{
    #region Fields, Properties and Indexers

    public Guid ProductId { get; set; } = default!;

    public int Quantity { get; set; } = default!;

    #endregion
}
