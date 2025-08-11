namespace EventSourcing.Events;

public record IntegrationEvent
{
    #region Fields, Properties and Indexers

    public string EventId => Guid.NewGuid().ToString();

    public DateTime OccurredOn => DateTime.UtcNow;

    public string EventType => GetType()?.AssemblyQualifiedName ?? string.Empty;

    public DateTimeOffset CreatedAt { get; set; }

    public string? CreatedBy { get; set; }

    public DateTime? LastModified { get; set; }

    public string? LastModifiedBy { get; set; }

    #endregion

}
