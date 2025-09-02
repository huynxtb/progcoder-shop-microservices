namespace EventSourcing.Events.Inventories;

public sealed record StockChangedIntegrationEvent : IntegrationEvent
{
    #region Fields, Properties and Indexers

    public Guid InventoryItemId { get; init; }

    public Guid ProductId { get; init; }

    public int ChangeType { get; init; }

    public int Amount { get; init; }

    public string? Source { get; init; }

    #endregion
}
