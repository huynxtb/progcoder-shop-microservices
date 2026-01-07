#region using

using Inventory.Domain.Abstractions;

#endregion

namespace Inventory.Domain.Entities;

public sealed class InboxMessageEntity : EntityId<Guid>
{
    #region Fields, Properties and Indexers

    public string? EventType { get; set; }

    public string? Content { get; set; }

    public DateTimeOffset ReceivedOnUtc { get; set; }

    public DateTimeOffset? ProcessedOnUtc { get; set; }

    public string? LastErrorMessage { get; set; }

    #endregion

    #region Factories

    public static InboxMessageEntity Create(Guid id, string eventType, string content, DateTimeOffset receivedOnUtc)
    {
        return new InboxMessageEntity()
        {
            Id = id,
            EventType = eventType,
            Content = content,
            ReceivedOnUtc = receivedOnUtc
        };
    }

    #endregion

    #region Methods

    public void CompleteProcessing(DateTimeOffset processedOnUtc, string? lastErrorMessage = null)
    {
        ProcessedOnUtc = processedOnUtc;
        LastErrorMessage = lastErrorMessage;
    }

    #endregion
}
