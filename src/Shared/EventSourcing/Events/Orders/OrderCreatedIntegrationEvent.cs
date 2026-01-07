namespace EventSourcing.Events.Orders;

public sealed record OrderCreatedIntegrationEvent : IntegrationEvent
{
    #region Fields, Properties and Indexers

    public Guid OrderId { get; init; }

    public string OrderNo { get; init; } = default!;

    public List<OrderItemIntegrationEvent> OrderItems { get; init; } = default!;

    public decimal TotalPrice { get; init; }

    public decimal FinalPrice { get; init; }

    #endregion
}

public sealed record OrderItemIntegrationEvent
{
    #region Fields, Properties and Indexers

    public Guid ProductId { get; init; }

    public string ProductName { get; init; } = default!;

    public int Quantity { get; init; }

    public decimal UnitPrice { get; init; }

    public decimal LineTotal { get; init; }

    #endregion
}