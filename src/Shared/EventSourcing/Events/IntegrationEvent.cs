namespace EventSourcing.Events;

public record IntegrationEvent
{
    #region Fields, Properties and Indexers

    public string Id => Guid.NewGuid().ToString();

    public DateTimeOffset OccurredOn => DateTimeOffset.UtcNow;

    public string? EventType => GetType()?.AssemblyQualifiedName;

    #endregion

}
