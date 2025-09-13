namespace Basket.Application.Dtos.Baskets;

public sealed class StoreShoppingCartDto
{
    #region Fields, Properties and Indexers

    public List<StoreShoppingCartItemDto> Items { get; set; } = [];

    #endregion
}
