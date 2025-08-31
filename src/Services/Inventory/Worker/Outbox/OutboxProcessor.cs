#region using

using Dapper;
using Inventory.Domain.Entities;
using MassTransit;
using Npgsql;
using System.Collections.Concurrent;
using System.Text.Json;

#endregion

namespace Inventory.Worker.Outbox;

internal sealed class OutboxProcessor(
    NpgsqlDataSource dataSource,
    IPublishEndpoint publishEndpoint,
    ILogger<OutboxProcessor> logger)
{
    private const int BatchSize = 1000;

    private static readonly ConcurrentDictionary<string, Type> TypeCache = new();

    public async Task<int> Execute(CancellationToken cancellationToken = default)
    {
        await using var connection = await dataSource.OpenConnectionAsync(cancellationToken);
        await using var transaction = await connection.BeginTransactionAsync(cancellationToken);

        var messages = (await connection.QueryAsync<OutboxMessageEntity>(
            """
                SELECT id AS Id, 
                       type AS Type, 
                       content AS Content
                FROM outbox_messages
                WHERE processed_on_utc IS NULL
                ORDER BY occurred_on_utc LIMIT @BatchSize
                FOR UPDATE SKIP LOCKED
            """,
            new { BatchSize },
            transaction: transaction)).AsList();

        var updateQueue = new ConcurrentQueue<OutboxUpdate>();

        var publishTasks = messages
            .Select(message => PublishMessage(message, updateQueue, publishEndpoint, cancellationToken))
            .ToList();

        await Task.WhenAll(publishTasks);

        if (!updateQueue.IsEmpty)
        {
            var updateSql =
                """
                    UPDATE outbox_messages
                    SET processed_on_utc = v.processed_on_utc,
                        error = v.error
                    FROM (VALUES
                        {0}
                    ) AS v(id, processed_on_utc, error)
                    WHERE outbox_messages.id = v.id::uuid
                """;

            var updates = updateQueue.ToList();
            var valuesList = string.Join(",",
                updateQueue.Select((_, i) => $"(@Id{i}, @ProcessedOn{i}, @Error{i})"));

            var parameters = new DynamicParameters();

            for (int i = 0; i < updateQueue.Count; i++)
            {
                parameters.Add($"Id{i}", updates[i].Id.ToString());
                parameters.Add($"ProcessedOn{i}", updates[i].ProcessedOnUtc);
                parameters.Add($"Error{i}", updates[i].Error);
            }

            var formattedSql = string.Format(updateSql, valuesList);

            await connection.ExecuteAsync(formattedSql, parameters, transaction: transaction);
        }

        await transaction.CommitAsync(cancellationToken);

        logger.LogInformation("dasd {Count}", messages.Count);

        return messages.Count;
    }

    private static async Task PublishMessage(
        OutboxMessageEntity message,
        ConcurrentQueue<OutboxUpdate> updateQueue,
        IPublishEndpoint publishEndpoint,
        CancellationToken cancellationToken)
    {
        try
        {
            var messageType = GetOrAddMessageType(message.EventType!);
            var deserializedMessage = JsonSerializer.Deserialize(message.Content!, messageType)!;

            await publishEndpoint.Publish(deserializedMessage, cancellationToken);

            updateQueue.Enqueue(new OutboxUpdate { Id = message.Id, ProcessedOnUtc = DateTime.UtcNow });
        }
        catch (Exception ex)
        {
            updateQueue.Enqueue(new OutboxUpdate { Id = message.Id, ProcessedOnUtc = DateTime.UtcNow, Error = ex.ToString() });
        }
    }

    private static Type GetOrAddMessageType(string typename)
    {
        return TypeCache.GetOrAdd(typename, name => EventSourcing.Events.AssemblyReference.Assembly.GetType(name)!);
    }

    private struct OutboxUpdate
    {
        public Guid Id { get; init; }
        public DateTime ProcessedOnUtc { get; init; }
        public string? Error { get; init; }
    }
}
