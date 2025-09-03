#region using

using Common.Configurations;
using Dapper;
using Inventory.Domain.Entities;
using MassTransit;
using MySql.Data.MySqlClient;
using System.Collections.Concurrent;
using System.Text.Json;

#endregion

namespace Inventory.Worker.Processors;

internal sealed class OutboxProcessor
{
    private const int BatchSize = 1000;
    private static readonly ConcurrentDictionary<string, Type> TypeCache = new();
    private readonly IConfiguration _cfg;
    private readonly IPublishEndpoint _publishEndpoint;
    private readonly ILogger<OutboxProcessor> _logger;

    public OutboxProcessor(
        IConfiguration cfg,
        IPublishEndpoint publishEndpoint,
        ILogger<OutboxProcessor> logger)
    {
        _cfg = cfg;
        _publishEndpoint = publishEndpoint;
        _logger = logger;
    }

    public async Task<int> Execute(CancellationToken cancellationToken = default)
    {
        await using var connection = new MySqlConnection(_cfg[$"{ConnectionStringsCfg.Section}:{ConnectionStringsCfg.Database}"]);
        await connection.OpenAsync(cancellationToken);
        await using var transaction = await connection.BeginTransactionAsync(cancellationToken);

        var messages = (await connection.QueryAsync<OutboxMessageEntity>(
            """
                SELECT id AS Id, 
                       event_type AS EventType, 
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
            .Select(message => PublishMessage(message, updateQueue, _publishEndpoint, cancellationToken))
            .ToList();

        await Task.WhenAll(publishTasks);

        if (!updateQueue.IsEmpty)
        {
            var updateSql =
                """
                    UPDATE outbox_messages
                    SET processed_on_utc = CASE 
                        {0}
                    END,
                    error = CASE 
                        {1}
                    END
                    WHERE id IN ({2})
                """;

            var updates = updateQueue.ToList();
            var whenThenProcessed = string.Join(" ",
                updates.Select((_, i) => $"WHEN id = @Id{i} THEN @ProcessedOn{i}"));
            var whenThenError = string.Join(" ",
                updates.Select((_, i) => $"WHEN id = @Id{i} THEN @Error{i}"));
            var ids = string.Join(",", updates.Select((_, i) => $"@Id{i}"));

            var parameters = new DynamicParameters();

            for (int i = 0; i < updates.Count; i++)
            {
                parameters.Add($"Id{i}", updates[i].Id);
                parameters.Add($"ProcessedOn{i}", updates[i].ProcessedOnUtc);
                parameters.Add($"Error{i}", updates[i].Error);
            }

            var formattedSql = string.Format(updateSql, whenThenProcessed, whenThenError, ids);

            await connection.ExecuteAsync(formattedSql, parameters, transaction: transaction);
        }

        await transaction.CommitAsync(cancellationToken);

        _logger.LogInformation("Processed {Count} messages from outbox", messages.Count);

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
        var type = TypeCache.GetOrAdd(typename, name => Type.GetType(name)!);
        return type;
    }

    private struct OutboxUpdate
    {
        public Guid Id { get; init; }

        public DateTime ProcessedOnUtc { get; init; }

        public string? Error { get; init; }
    }
}
