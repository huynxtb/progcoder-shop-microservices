#region using

using Basket.Domain.Abstractions;

#endregion

namespace Basket.Domain.Entities;

public sealed class OutboxMessageEntity : EntityId<Guid>
{
    #region Fields, Properties and Indexers

    public string? EventType { get; private set; }

    public string? Content { get; private set; }

    public DateTimeOffset OccurredOnUtc { get; private set; }

    public DateTimeOffset? ProcessedOnUtc { get; private set; }

    public string? Error { get; private set; }

    #endregion

    #region Factories

    public static OutboxMessageEntity Create(Guid id, string eventType, string content, DateTimeOffset occurredOnUtc)
    {
        return new OutboxMessageEntity()
        {
            Id = id,
            EventType = eventType,
            Content = content,
            OccurredOnUtc = occurredOnUtc
        };
    }

    #endregion

    #region Methods

    public void Process(DateTimeOffset processedOnUtc, string? error = null)
    {
        ProcessedOnUtc = processedOnUtc;
        Error = error;
    }

    #endregion
}
