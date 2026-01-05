namespace Inventory.Worker.Outbox.Models;

public sealed record OutboxMessage
{
    #region Fields, Properties and Indexers

    public Guid Id { get; init; }

    public string Type { get; init; } = default!;

    public string Content { get; init; } = default!;

    public int AttemptCount { get; init; }

    public int MaxAttempts { get; init; }

    public DateTimeOffset? NextAttemptOnUtc { get; init; }

    public string? LastErrorMessage { get; init; }

    #endregion
}

