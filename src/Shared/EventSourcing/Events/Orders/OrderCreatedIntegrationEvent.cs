namespace EventSourcing.Events.Orders;

public sealed record OrderCreatedIntegrationEvent : IntegrationEvent
{
    #region Fields, Properties and Indexers
    
    public Guid OrderId { get; set; }

    public string OrderNo { get; set; } = default!;

    public List<OrderItemIntegrationEvent> OrderItems { get; set; } = default!;

    public decimal TotalPrice { get; set; }

    public decimal FinalPrice { get; set; }

    #endregion
}

public sealed record OrderItemIntegrationEvent
{
    #region Fields, Properties and Indexers

    public Guid ProductId { get; set; }

    public string ProductName { get; set; } = default!;

    public int Quantity { get; set; }

    public decimal UnitPrice { get; set; }

    public decimal LineTotal { get; set; }

    #endregion
}