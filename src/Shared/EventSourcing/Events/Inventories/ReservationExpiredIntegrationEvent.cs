namespace EventSourcing.Events.Inventories;

public sealed record ReservationExpiredIntegrationEvent : IntegrationEvent
{
    #region Fields, Properties and Indexers

    public Guid ReservationId { get; init; }

    public Guid OrderId { get; init; }

    public Guid ProductId { get; init; }

    public string ProductName { get; init; } = default!;

    public int Quantity { get; init; }

    #endregion
}

