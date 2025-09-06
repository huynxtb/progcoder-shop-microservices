#region using

using Common.Configurations;
using Dapper;
using Inventory.Domain.Entities;
using Inventory.Worker.Structs;
using MassTransit;
using MySql.Data.MySqlClient;
using System.Collections.Concurrent;
using System.Text.Json;

#endregion

namespace Inventory.Worker.Processors;

internal sealed class OutboxProcessor
{
    #region Fields, Properties and Indexers

    private const int BatchSize = 1000;

    private static readonly ConcurrentDictionary<string, Type> TypeCache = new();

    private readonly IConfiguration _cfg;

    private readonly IPublishEndpoint _publish;

    private readonly ILogger<OutboxProcessor> _logger;

    #endregion

    #region Ctors

    public OutboxProcessor(
        IConfiguration cfg,
        IPublishEndpoint publish,
        ILogger<OutboxProcessor> logger)
    {
        _cfg = cfg;
        _publish = publish;
        _logger = logger;
    }

    #endregion

    #region Methods

    public async Task<int> ExecuteAsync(CancellationToken cancellationToken = default)
    {
        _logger.LogDebug("Starting outbox message retrieval");
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
                ORDER BY occurred_on_utc ASC 
                LIMIT @BatchSize
                FOR UPDATE SKIP LOCKED
            """,
            new { BatchSize },
            transaction: transaction)).AsList();

        _logger.LogInformation("Retrieved {Count} messages from outbox", messages.Count);

        var updateQueue = new ConcurrentQueue<OutboxUpdate>();

        var publishTasks = messages
            .Select(message => PublishMessage(message, updateQueue, _publish, _logger, cancellationToken))
            .ToList();

        await Task.WhenAll(publishTasks);

        if (!updateQueue.IsEmpty)
        {
            _logger.LogDebug("Updating processed messages in database");
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
            var whenThenProcessed = string.Join(" ", updates.Select((_, i) => $"WHEN id = @Id{i} THEN @ProcessedOn{i}"));
            var whenThenError = string.Join(" ", updates.Select((_, i) => $"WHEN id = @Id{i} THEN @Error{i}"));
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
            _logger.LogDebug("Database update for processed messages complete");
        }

        await transaction.CommitAsync(cancellationToken);
        _logger.LogInformation("Processed {Count} messages from outbox", messages.Count);

        return messages.Count;
    }

    private static async Task PublishMessage(
        OutboxMessageEntity message,
        ConcurrentQueue<OutboxUpdate> updateQueue,
        IPublishEndpoint publish,
        ILogger<OutboxProcessor> logger,
        CancellationToken cancellationToken)
    {
        try
        {
            logger.LogInformation("Publishing outbox message {Id} of type {EventType}", message.Id, message.EventType);
            var messageType = GetOrAddMessageType(message.EventType!);
            var deserializedMessage = JsonSerializer.Deserialize(message.Content!, messageType)!;

            await publish.Publish(deserializedMessage, cancellationToken);

            updateQueue.Enqueue(new OutboxUpdate { Id = message.Id, ProcessedOnUtc = DateTime.UtcNow });
            logger.LogInformation("Successfully published outbox message {Id}", message.Id);
        }
        catch (Exception ex)
        {
            updateQueue.Enqueue(new OutboxUpdate { Id = message.Id, ProcessedOnUtc = DateTime.UtcNow, Error = ex.ToString() });
            logger.LogError(ex, "Error publishing outbox message {Id}", message.Id);
        }
    }

    private static Type GetOrAddMessageType(string typename)
    {
        return TypeCache.GetOrAdd(typename, name => Type.GetType(name)!);
    }

    #endregion
}
