using Order.Application.Dtos.ValueObjects;

namespace Order.Application.Dtos.Orders;

public class OrderItemDto
{
    #region Fields, Properties and Indexers

    public ProductDto Product { get; set; } = default!;

    public int Quantity { get; set; }

    #endregion
}