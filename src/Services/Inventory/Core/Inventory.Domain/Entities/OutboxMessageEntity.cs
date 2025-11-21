#region using

using Common.Constants;
using Inventory.Domain.Abstractions;

#endregion

namespace Inventory.Domain.Entities;

public sealed class OutboxMessageEntity : EntityId<Guid>
{
    #region Fields, Properties and Indexers

    public string? EventType { get; set; }

    public string? Content { get; set; }

    public DateTimeOffset OccurredOnUtc { get; set; }

    public DateTimeOffset? ProcessedOnUtc { get; set; }

    public string? LastErrorMessage { get; set; }

    public DateTimeOffset? ClaimedOnUtc { get; set; }

    public int AttemptCount { get; set; }

    public int MaxAttempts { get; set; }

    public DateTimeOffset? NextAttemptOnUtc { get; set; }

    #endregion

    #region Ctors

    public OutboxMessageEntity() { }

    public OutboxMessageEntity(Guid id, string eventType, string content, DateTimeOffset occurredOnUtc)
    {
        Id = id;
        EventType = eventType;
        Content = content;
        OccurredOnUtc = occurredOnUtc;
        MaxAttempts = AppConstants.MaxAttempts;
        AttemptCount = 0;
    }

    #endregion

    #region Factories

    public static OutboxMessageEntity Create(
        Guid id, 
        string eventType, 
        string content, 
        DateTimeOffset occurredOnUtc)
    {
        return new OutboxMessageEntity(id, eventType, content, occurredOnUtc);
    }

    #endregion

    #region Methods

    public void CompleteProcessing(DateTimeOffset processedOnUtc)
    {
        ProcessedOnUtc = processedOnUtc;
        LastErrorMessage = null;
        ClaimedOnUtc = null;
        NextAttemptOnUtc = null;
    }

    public void Claim(DateTimeOffset claimedOnUtc)
    {
        ClaimedOnUtc = claimedOnUtc;
    }

    public void SetRetryProperties(
        int attemptCount, 
        int maxAttempts, 
        DateTimeOffset? nextAttemptOnUtc, 
        string? lastErrorMessage)
    {
        AttemptCount = attemptCount;
        MaxAttempts = maxAttempts;
        NextAttemptOnUtc = nextAttemptOnUtc;
        LastErrorMessage = lastErrorMessage;
    }

    public void RecordFailedAttempt(string errorMessage, DateTimeOffset now)
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
            
            NextAttemptOnUtc = now + delay;
            LastErrorMessage = errorMessage;
        }
    }

    public void IncreaseAttemptCount()
    {
        AttemptCount += 1;
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
