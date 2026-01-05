namespace EventSourcing.Events;

public record IntegrationEvent
{
    #region Fields, Properties and Indexers

    public string Id { get; init; } = default!;

    public DateTimeOffset OccurredOn { get; init; } = DateTimeOffset.UtcNow;

    public string? EventType => GetType()?.AssemblyQualifiedName;

    #endregion

}
