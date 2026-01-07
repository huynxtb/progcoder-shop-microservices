#region using

using Dapper;
using Order.Worker.Outbox.Abstractions;
using Order.Worker.Outbox.Models;
using Order.Worker.Outbox.Structs;
using Npgsql;

#endregion

namespace Order.Worker.Outbox.Providers;

public sealed class PostgreSqlDatabaseProvider : IDatabaseProvider
{
    #region Implementations

    public async Task<List<OutboxMessage>> GetUnprocessedMessagesAsync(
        string connectionString,
        int batchSize,
        CancellationToken cancellationToken = default)
    {
        await using var connection = new NpgsqlConnection(connectionString);
        await connection.OpenAsync(cancellationToken);

        await using var transaction = await connection.BeginTransactionAsync(cancellationToken);

        var messages = await connection.QueryAsync<OutboxMessage>(
            """
            SELECT 
                id AS Id,
                event_type AS Type,
                content AS Content,
                attempt_count AS AttemptCount,
                max_attempts AS MaxAttempts,
                next_attempt_on_utc AS NextAttemptOnUtc,
                last_error_message AS LastErrorMessage
            FROM outbox_messages 
            WHERE processed_on_utc IS NULL 
              AND attempt_count < max_attempts
              AND (next_attempt_on_utc IS NULL OR next_attempt_on_utc <= @CurrentTime)
            ORDER BY occurred_on_utc
            LIMIT @BatchSize
            FOR UPDATE SKIP LOCKED
            """,
            new { BatchSize = batchSize, CurrentTime = DateTimeOffset.UtcNow },
            transaction: transaction);

        await transaction.CommitAsync(cancellationToken);

        return messages.AsList();
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
            SET processed_on_utc = v.processed_on_utc,
                last_error_message = v.error,
                attempt_count = v.attempt_count,
                next_attempt_on_utc = v.next_attempt_on_utc
            FROM (VALUES
                {0}
            ) AS v(id, processed_on_utc, error, attempt_count, next_attempt_on_utc)
            WHERE outbox_messages.id = v.id::uuid
            """;

        var valuesList = string.Join(",",
            updatesList.Select((_, i) => $"(@Id{i}, @ProcessedOn{i}, @Error{i}, @AttemptCount{i}, @NextAttempt{i})"));

        var parameters = new DynamicParameters();

        for (int i = 0; i < updatesList.Count; i++)
        {
            parameters.Add($"Id{i}", updatesList[i].Id.ToString());
            parameters.Add($"ProcessedOn{i}", updatesList[i].ProcessedOnUtc);
            parameters.Add($"Error{i}", updatesList[i].LastErrorMessage);
            parameters.Add($"AttemptCount{i}", updatesList[i].AttemptCount);
            parameters.Add($"NextAttempt{i}", updatesList[i].NextAttemptOnUtc);
        }

        var formattedSql = string.Format(updateSql, valuesList);

        await connection.ExecuteAsync(formattedSql, parameters, transaction: transaction);
        await transaction.CommitAsync(cancellationToken);
    }

    #endregion
}
