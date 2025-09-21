#region using

using Basket.Domain.Abstractions;
using Common.Constants;

#endregion

namespace Basket.Domain.Entities;

public sealed class OutboxMessageEntity : EntityId<Guid>
{
    #region Fields, Properties and Indexers

    public string? EventType { get; private set; }

    public string? Content { get; private set; }

    public DateTimeOffset OccurredOnUtc { get; private set; }

    public DateTimeOffset? ProcessedOnUtc { get; private set; }

    public string? LastErrorMessage { get; private set; }

    public DateTimeOffset? ClaimedOnUtc { get; private set; }

    public int AttemptCount { get; private set; }

    public int MaxAttempts { get; private set; }

    public DateTimeOffset? NextAttemptOnUtc { get; private set; }

    #endregion

    #region Ctors

    public OutboxMessageEntity() { }

    public OutboxMessageEntity(Guid id, string eventType, string content, DateTimeOffset occurredOnUtc)
    {
        Id = id;
        EventType = eventType;
        Content = content;
        OccurredOnUtc = occurredOnUtc;
        MaxAttempts = Constants.MaxAttempts;
        AttemptCount = 0;
    }

    #endregion

    #region Factories

    public static OutboxMessageEntity Create(Guid id, string eventType, string content, DateTimeOffset occurredOnUtc)
    {
        return new OutboxMessageEntity(id, eventType, content, occurredOnUtc);
    }

    #endregion

    #region Methods

    public void CompleteProcessing(DateTimeOffset processedOnUtc, string? lastErrorMessage = null)
    {
        ProcessedOnUtc = processedOnUtc;
        LastErrorMessage = lastErrorMessage;
        ClaimedOnUtc = null;
        NextAttemptOnUtc = null;
    }

    public void Claim(DateTimeOffset claimedOnUtc)
    {
        ClaimedOnUtc = claimedOnUtc;
    }

    public void SetRetryProperties(int attemptCount, int maxAttempts, DateTimeOffset? nextAttemptOnUtc, string? lastErrorMessage)
    {
        AttemptCount = attemptCount;
        MaxAttempts = maxAttempts;
        NextAttemptOnUtc = nextAttemptOnUtc;
        LastErrorMessage = lastErrorMessage;
    }

    public void RecordFailedAttempt(string errorMessage, DateTimeOffset currentTime)
    {
        IncreaseAttemptCount();
        
        if (AttemptCount >= MaxAttempts)
        {
            LastErrorMessage = $"Max attempts ({MaxAttempts}) exceeded. Last error: {errorMessage}";
            NextAttemptOnUtc = null;
        }
        else
        {
            // Calculate exponential backoff with jitter
            var baseDelay = TimeSpan.FromSeconds(Math.Pow(2, AttemptCount - 1));
            var maxDelay = TimeSpan.FromMinutes(5);
            var jitter = TimeSpan.FromMilliseconds(Random.Shared.Next(0, 1000));
            var delay = TimeSpan.FromTicks(Math.Min(baseDelay.Ticks, maxDelay.Ticks)) + jitter;
            
            NextAttemptOnUtc = currentTime + delay;
            LastErrorMessage = errorMessage;
        }
    }

    public void IncreaseAttemptCount()
    {
        AttemptCount++;
    }

    public bool CanRetry(DateTimeOffset currentTime)
    {
        return AttemptCount < MaxAttempts && 
               (NextAttemptOnUtc == null || currentTime >= NextAttemptOnUtc.Value);
    }

    public bool IsPermanentlyFailed()
    {
        return AttemptCount >= MaxAttempts;
    }

    #endregion
}
