namespace Basket.Application.Dtos.Baskets;

public sealed record BasketCheckoutItemDto
{
    #region Fields, Properties and Indexers

    public Guid ProductId { get; init; }

    public int Quantity { get; init; }

    #endregion
}


