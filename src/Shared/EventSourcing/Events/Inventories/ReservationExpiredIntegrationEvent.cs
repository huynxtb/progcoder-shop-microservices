namespace EventSourcing.Events.Inventories;

public sealed record ReservationExpiredIntegrationEvent : IntegrationEvent
{
    #region Fields, Properties and Indexers

    public Guid ReservationId { get; init; }

    public Guid ProductId { get; init; }

    public string ProductName { get; init; } = default!;

    public Guid ReferenceId { get; init; }

    public int Quantity { get; init; }

    #endregion
}

