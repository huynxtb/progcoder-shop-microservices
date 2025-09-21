#region using

using Dapper;
using Order.Domain.Entities;
using Order.Worker.Outbox.Abstractions;
using Order.Worker.Outbox.Structs;
using Npgsql;

#endregion

namespace Order.Worker.Outbox.Providers;

public sealed class PostgreSqlDatabaseProvider : IDatabaseProvider
{
    #region Implementations

    public async Task ReleaseExpiredClaimsAsync(
        string connectionString, 
        TimeSpan claimTimeout, 
        CancellationToken cancellationToken = default)
    {
        var expiredTime = DateTimeOffset.UtcNow.Subtract(claimTimeout);

        await using var connection = new NpgsqlConnection(connectionString);
        await connection.OpenAsync(cancellationToken);

        await using var transaction = await connection.BeginTransactionAsync(cancellationToken);

        await connection.ExecuteAsync(
            """
                UPDATE outbox_messages 
                    SET claimed_on_utc = NULL 
                WHERE processed_on_utc IS NULL 
                AND claimed_on_utc IS NOT NULL 
                AND claimed_on_utc < @ExpiredTime
            """,
            new { ExpiredTime = expiredTime },
            transaction: transaction);

        await transaction.CommitAsync(cancellationToken);
    }

    public async Task<List<OutboxMessageEntity>> ClaimAndRetrieveMessagesBatchAsync(
        string connectionString, 
        int batchSize, 
        TimeSpan claimTimeout, 
        CancellationToken cancellationToken = default)
    {
        var now = DateTimeOffset.UtcNow;
        var expiredTime = now.Subtract(claimTimeout);

        await using var connection = new NpgsqlConnection(connectionString);
        await connection.OpenAsync(cancellationToken);

        await using var transaction = await connection.BeginTransactionAsync(cancellationToken);

        // First, select and lock the rows we want to claim
        var messagesToClaim = await connection.QueryAsync<OutboxMessageEntity>(
            """
                SELECT 
                    id AS Id,
                    event_type AS EventType,
                    content AS Content,
                    occurred_on_utc AS OccurredOnUtc
                FROM outbox_messages 
                WHERE processed_on_utc IS NULL 
                AND (claimed_on_utc IS NULL OR claimed_on_utc < @ExpiredTime)
                ORDER BY occurred_on_utc ASC 
                LIMIT @BatchSize
                FOR UPDATE SKIP LOCKED
            """,
            new { BatchSize = batchSize, ExpiredTime = expiredTime },
            transaction: transaction);

        var messagesList = messagesToClaim.ToList();
        
        if (!messagesList.Any())
        {
            await transaction.CommitAsync(cancellationToken);
            return [];
        }

        // Now claim all the locked messages in a single update
        var messageIds = messagesList.Select(m => m.Id).ToList();
        var claimedCount = await connection.ExecuteAsync(
            """
                UPDATE outbox_messages 
                    SET claimed_on_utc = @ClaimedOnUtc 
                WHERE id = ANY(@MessageIds)
            """,
            new { ClaimedOnUtc = now, MessageIds = messageIds },
            transaction: transaction);

        if (claimedCount != messageIds.Count)
        {
            // Some messages were claimed by another instance, get the remaining ones
            var remainingMessages = await connection.QueryAsync<OutboxMessageEntity>(
                """
                    SELECT 
                        id AS Id, 
                        event_type AS EventType, 
                        content AS Content, 
                        claimed_on_utc AS ClaimedOnUtc
                    FROM outbox_messages 
                    WHERE id = ANY(@MessageIds) 
                    AND claimed_on_utc = @ClaimedOnUtc
                """,
                new { MessageIds = messageIds, ClaimedOnUtc = now },
                transaction: transaction);

            await transaction.CommitAsync(cancellationToken);
            return remainingMessages.ToList();
        }

        // All messages were successfully claimed
        var claimedMessages = messagesList.Select(m => 
        {
            var message = new OutboxMessageEntity(m.Id, m.EventType!, m.Content!, m.OccurredOnUtc);
            message.Claim(now);
            return message;
        }).ToList();

        await transaction.CommitAsync(cancellationToken);
        return claimedMessages;
    }

    public async Task<List<OutboxMessageEntity>> ClaimAndRetrieveRetryMessagesAsync(
        string connectionString, 
        int batchSize, 
        CancellationToken cancellationToken = default)
    {
        var now = DateTimeOffset.UtcNow;

        await using var connection = new NpgsqlConnection(connectionString);
        await connection.OpenAsync(cancellationToken);

        await using var transaction = await connection.BeginTransactionAsync(cancellationToken);

        // Get messages that are ready for retry
        var retryMessages = await connection.QueryAsync<OutboxMessageEntity>(
            """
                SELECT 
                    id AS Id, 
                    event_type AS EventType, 
                    content AS Content, 
                    occurred_on_utc AS OccurredOnUtc,
                    attempt_count AS AttemptCount, 
                    max_attempts AS MaxAttempts, 
                    next_attempt_on_utc AS NextAttemptOnUtc,
                    last_error_message AS LastErrorMessage
                FROM outbox_messages 
                WHERE processed_on_utc IS NULL 
                AND attempt_count < max_attempts
                AND (next_attempt_on_utc IS NULL OR next_attempt_on_utc <= @CurrentTime)
                AND (claimed_on_utc IS NULL OR claimed_on_utc < @ExpiredTime)
                ORDER BY next_attempt_on_utc ASC NULLS LAST, occurred_on_utc ASC
                LIMIT @BatchSize
                FOR UPDATE SKIP LOCKED
            """,
            new { BatchSize = batchSize, CurrentTime = now, ExpiredTime = now.Subtract(TimeSpan.FromMinutes(5)) },
            transaction: transaction);

        var messagesList = retryMessages.ToList();

        if (!messagesList.Any())
        {
            await transaction.CommitAsync(cancellationToken);
            return [];
        }

        // Claim the retry messages
        var messageIds = messagesList.Select(m => m.Id).ToList();
        var claimedCount = await connection.ExecuteAsync(
            """
                UPDATE outbox_messages 
                    SET claimed_on_utc = @ClaimedOnUtc 
                WHERE id = ANY(@MessageIds)
            """,
            new { ClaimedOnUtc = now, MessageIds = messageIds },
            transaction: transaction);

        if (claimedCount != messageIds.Count)
        {
            // Some messages were claimed by another instance, get the remaining ones
            var remainingMessages = await connection.QueryAsync<OutboxMessageEntity>(
                """
                    SELECT 
                        id AS Id, 
                        event_type AS EventType, 
                        content AS Content, 
                        occurred_on_utc AS OccurredOnUtc,
                        attempt_count AS AttemptCount, 
                        max_attempts AS MaxAttempts, 
                        next_attempt_on_utc AS NextAttemptOnUtc,
                        last_error_message AS LastErrorMessage, 
                        claimed_on_utc AS ClaimedOnUtc
                    FROM outbox_messages 
                    WHERE id = ANY(@MessageIds) 
                    AND claimed_on_utc = @ClaimedOnUtc
                """,
                new { MessageIds = messageIds, ClaimedOnUtc = now },
                transaction: transaction);

            await transaction.CommitAsync(cancellationToken);
            return remainingMessages.ToList();
        }

        // All messages were successfully claimed
        var claimedMessages = messagesList.Select(m => 
        {
            var message = new OutboxMessageEntity(m.Id, m.EventType!, m.Content!, m.OccurredOnUtc);
            message.SetRetryProperties(m.AttemptCount, m.MaxAttempts, m.NextAttemptOnUtc, m.LastErrorMessage);
            message.Claim(now);
            return message;
        }).ToList();

        await transaction.CommitAsync(cancellationToken);
        return claimedMessages;
    }

    public async Task ReleaseClaimsAsync(
        string connectionString, 
        IEnumerable<Guid> messageIds, 
        CancellationToken cancellationToken = default)
    {
        var messageIdList = messageIds.ToList();
        if (!messageIdList.Any())
            return;

        await using var connection = new NpgsqlConnection(connectionString);
        await connection.OpenAsync(cancellationToken);

        await using var transaction = await connection.BeginTransactionAsync(cancellationToken);

        await connection.ExecuteAsync(
            """
                UPDATE outbox_messages 
                    SET claimed_on_utc = NULL 
                WHERE id = ANY(@MessageIds)
            """,
            new { MessageIds = messageIdList },
            transaction: transaction);

        await transaction.CommitAsync(cancellationToken);
    }

    public async Task UpdateProcessedMessagesAsync(
        string connectionString, 
        IEnumerable<OutboxUpdate> updates, 
        CancellationToken cancellationToken = default)
    {
        var updatesList = updates.ToList();
        if (!updatesList.Any())
            return;

        await using var connection = new NpgsqlConnection(connectionString);
        await connection.OpenAsync(cancellationToken);

        await using var transaction = await connection.BeginTransactionAsync(cancellationToken);

        var updateSql =
            """
                UPDATE outbox_messages
                SET processed_on_utc = CASE 
                    {0}
                END,
                last_error_message = CASE 
                    {1}
                END,
                attempt_count = CASE 
                    {2}
                END,
                next_attempt_on_utc = CASE 
                    {3}
                END,
                claimed_on_utc = NULL
                WHERE id = ANY({4})
            """;

        var whenThenProcessed = string.Join(" ", updatesList.Select((_, i) => $"WHEN id = @Id{i} THEN @ProcessedOn{i}"));
        var whenThenError = string.Join(" ", updatesList.Select((_, i) => $"WHEN id = @Id{i} THEN @Error{i}"));
        var whenThenAttemptCount = string.Join(" ", updatesList.Select((_, i) => $"WHEN id = @Id{i} THEN @AttemptCount{i}"));
        var whenThenNextAttempt = string.Join(" ", updatesList.Select((_, i) => $"WHEN id = @Id{i} THEN @NextAttempt{i}"));
        var ids = string.Join(",", updatesList.Select((_, i) => $"@Id{i}"));

        var parameters = new DynamicParameters();

        for (int i = 0; i < updatesList.Count; i++)
        {
            parameters.Add($"Id{i}", updatesList[i].Id);
            parameters.Add($"ProcessedOn{i}", updatesList[i].ProcessedOnUtc);
            parameters.Add($"Error{i}", updatesList[i].LastErrorMessage);
            parameters.Add($"AttemptCount{i}", updatesList[i].AttemptCount);
            parameters.Add($"NextAttempt{i}", updatesList[i].NextAttemptOnUtc);
        }

        var formattedSql = string.Format(updateSql, whenThenProcessed, whenThenError, whenThenAttemptCount, whenThenNextAttempt, ids);

        await connection.ExecuteAsync(formattedSql, parameters, transaction: transaction);
        await transaction.CommitAsync(cancellationToken);
    }

    #endregion
}
