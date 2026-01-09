#region using

using Order.Domain.Abstractions;

#endregion

namespace Order.Domain.Entities;

public sealed class InboxMessageEntity : EntityId<Guid>
{
    #region Fields, Properties and Indexers

    public string? EventType { get; set; }

    public string? Content { get; set; }

    public DateTimeOffset ReceivedOnUtc { get; set; }

    public DateTimeOffset? ProcessedOnUtc { get; set; }

    public string? LastErrorMessage { get; set; }

    public int AttemptCount { get; set; }

    public int MaxAttempts { get; set; }

    public DateTimeOffset? NextAttemptOnUtc { get; set; }

    #endregion

    #region Factories

    public static InboxMessageEntity Create(Guid id, string eventType, string content, DateTimeOffset receivedOnUtc)
    {
        return new InboxMessageEntity()
        {
            Id = id,
            EventType = eventType,
            Content = content,
            ReceivedOnUtc = receivedOnUtc,
            MaxAttempts = AppConstants.MaxAttempts,
            AttemptCount = 0
        };
    }

    #endregion

    #region Methods

    public void CompleteProcessing(DateTimeOffset processedOnUtc, string? lastErrorMessage = null)
    {
        ProcessedOnUtc = processedOnUtc;
        LastErrorMessage = lastErrorMessage;
        NextAttemptOnUtc = null;
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
