namespace EventSourcing.Events.Inventories;

public sealed record InventoryReservationFailedIntegrationEvent : IntegrationEvent
{
    #region Fields, Properties and Indexers

    public Guid ReferenceId { get; init; }

    public Guid ProductId { get; init; }

    public string ProductName { get; init; } = default!;

    public int RequestedQuantity { get; init; }

    public int AvailableQuantity { get; init; }

    public string Reason { get; init; } = default!;

    #endregion
}

