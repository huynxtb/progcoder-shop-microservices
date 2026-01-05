#region using

using Common.Configurations;
using Inventory.Worker.Outbox.Abstractions;
using Inventory.Worker.Outbox.Factories;
using Inventory.Worker.Outbox.Structs;
using MassTransit;
using System.Collections.Concurrent;
using System.Text.Json;

#endregion

namespace Inventory.Worker.Outbox.Processors;

internal sealed class OutboxProcessor
{
    #region Fields, Properties and Indexers

    private readonly int _batchSize;

    private readonly string _connectionString;

    private readonly IDatabaseProvider _databaseProvider;

    private static readonly ConcurrentDictionary<string, Type> TypeCache = new();

    private readonly IPublishEndpoint _publish;

    private readonly ILogger<OutboxProcessor> _logger;

    #endregion

    #region Ctors

    public OutboxProcessor(
        IConfiguration cfg,
        IPublishEndpoint publish,
        ILogger<OutboxProcessor> logger)
    {
        _connectionString = cfg[$"{ConnectionStringsCfg.Section}:{ConnectionStringsCfg.Database}"]!;
        _batchSize = cfg.GetValue<int>($"{WorkerCfg.Outbox.Section}:{WorkerCfg.Outbox.BatchSize}", 1000);
        _databaseProvider = DatabaseProviderFactory.CreateProvider(cfg[$"{ConnectionStringsCfg.Section}:{ConnectionStringsCfg.DbType}"]!);
        _publish = publish;
        _logger = logger;
    }

    #endregion

    #region Methods

    public async Task<int> ExecuteAsync(CancellationToken cancellationToken = default)
    {
        var messages = await _databaseProvider.GetUnprocessedMessagesAsync(_connectionString, _batchSize, cancellationToken);

        if (messages.Count == 0)
            return 0;

        var updateQueue = new ConcurrentQueue<OutboxUpdate>();

        var publishTasks = messages
            .Select(message => PublishMessageAsync(message, updateQueue, cancellationToken))
            .ToList();

        await Task.WhenAll(publishTasks);

        if (!updateQueue.IsEmpty)
        {
            await _databaseProvider.UpdateProcessedMessagesAsync(_connectionString, updateQueue, cancellationToken);
        }

        return messages.Count;
    }

    private async Task PublishMessageAsync(
        Models.OutboxMessage message,
        ConcurrentQueue<OutboxUpdate> updateQueue,
        CancellationToken cancellationToken)
    {
        try
        {
            var messageType = GetOrAddMessageType(message.Type);
            var deserializedMessage = JsonSerializer.Deserialize(message.Content, messageType)!;

            await _publish.Publish(deserializedMessage, cancellationToken);

            updateQueue.Enqueue(new OutboxUpdate(
                message.Id,
                DateTimeOffset.UtcNow,
                null,
                message.AttemptCount + 1,
                null));
        }
        catch (Exception ex)
        {
            var currentTime = DateTimeOffset.UtcNow;
            var attemptCount = message.AttemptCount + 1;

            if (attemptCount >= message.MaxAttempts)
            {
                updateQueue.Enqueue(new OutboxUpdate(
                    message.Id,
                    currentTime,
                    $"Max attempts ({message.MaxAttempts}) exceeded. Last error: {ex}",
                    attemptCount,
                    null));

                _logger.LogError(ex, "Permanently failed to publish outbox message {Id} after {AttemptCount} attempts",
                    message.Id, attemptCount);
            }
            else
            {
                var baseDelay = TimeSpan.FromSeconds(Math.Pow(2, attemptCount - 1));
                var maxDelay = TimeSpan.FromMinutes(5);
                var jitter = TimeSpan.FromMilliseconds(Random.Shared.Next(0, 1000));
                var delay = TimeSpan.FromTicks(Math.Min(baseDelay.Ticks, maxDelay.Ticks)) + jitter;
                var nextAttemptOnUtc = currentTime + delay;

                updateQueue.Enqueue(new OutboxUpdate(
                    message.Id,
                    currentTime,
                    ex.ToString(),
                    attemptCount,
                    nextAttemptOnUtc));

                _logger.LogWarning(ex, "Failed to publish outbox message {Id} (attempt {AttemptCount}/{MaxAttempts}), will retry at {NextAttemptOnUtc}",
                    message.Id, attemptCount, message.MaxAttempts, nextAttemptOnUtc);
            }
        }
    }

    private static Type GetOrAddMessageType(string typename)
    {
        return TypeCache.GetOrAdd(typename, name => Type.GetType(name)!);
    }

    #endregion
}
