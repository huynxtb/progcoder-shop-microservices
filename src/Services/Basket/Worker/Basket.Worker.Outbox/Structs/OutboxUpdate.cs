namespace Basket.Worker.Outbox.Structs;

public record struct OutboxUpdate(
    Guid Id,
    DateTimeOffset ProcessedOnUtc,
    string? LastErrorMessage,
    int AttemptCount,
    DateTimeOffset? NextAttemptOnUtc);
