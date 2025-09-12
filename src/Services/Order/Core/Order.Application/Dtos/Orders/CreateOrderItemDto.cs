namespace Order.Application.Dtos.Orders;

public sealed class CreateOrderItemDto
{
    #region Fields, Properties and Indexers

    public Guid ProductId { get; set; }

    public int Quantity { get; set; }

    #endregion
}
