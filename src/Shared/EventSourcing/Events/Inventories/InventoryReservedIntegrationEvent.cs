namespace EventSourcing.Events.Inventories;

public sealed record InventoryReservedIntegrationEvent : IntegrationEvent
{
    #region Fields, Properties and Indexers

    public Guid ReservationId { get; init; }

    public Guid ProductId { get; init; }

    public string ProductName { get; init; } = default!;

    public Guid ReferenceId { get; init; }

    public int Quantity { get; init; }

    public DateTimeOffset? ExpiresAt { get; init; }

    #endregion
}

