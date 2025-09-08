namespace Order.Worker.Structs;

public struct OutboxUpdate
{
    #region Fields, Properties and Indexers

    public Guid Id { get; init; }

    public DateTime ProcessedOnUtc { get; init; }

    public string? Error { get; init; }

    #endregion
}
