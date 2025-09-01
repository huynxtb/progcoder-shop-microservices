#region using

using Inventory.Domain.Abstractions;

#endregion

namespace Inventory.Domain.Entities;

public sealed class OutboxMessageEntity : EntityId<Guid>
{
    #region Fields, Properties and Indexers

    public string? EventType { get; private set; }

    public string? Content { get; private set; }

    public DateTimeOffset OccurredOnUtc { get; private set; }

    public DateTimeOffset? ProcessedOnUtc { get; private set; }

    public string? Error { get; private set; }

    #endregion

    #region Ctors

    private OutboxMessageEntity() { }

    #endregion

    #region Methods

    public static OutboxMessageEntity Create(string eventType, string content, DateTimeOffset occurredOnUtc)
    {
        return new OutboxMessageEntity()
        {
            Id = Guid.NewGuid(),
            EventType = eventType,
            Content = content,
            OccurredOnUtc = occurredOnUtc
        };
    }

    public void Processe(DateTimeOffset processedOnUtc, string? error = null)
    {
        ProcessedOnUtc = processedOnUtc;
        Error = error;
    }

    #endregion
}
