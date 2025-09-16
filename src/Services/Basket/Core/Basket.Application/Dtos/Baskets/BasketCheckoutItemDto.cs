namespace Basket.Application.Dtos.Baskets;

public sealed record BasketCheckoutItemDto
{
    public Guid ProductId { get; init; }

    public int Quantity { get; init; }
}


