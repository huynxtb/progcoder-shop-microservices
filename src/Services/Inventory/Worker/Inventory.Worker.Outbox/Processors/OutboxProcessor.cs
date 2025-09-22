#region using

using Common.Configurations;
using Common.Extensions;
using Inventory.Domain.Entities;
using Inventory.Worker.Outbox.Abstractions;
using Inventory.Worker.Outbox.Enums;
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

        var claimTimeout = TimeSpan.FromMinutes(5);

        // First, release any expired claims (crash recovery)
        await _databaseProvider.ReleaseExpiredClaimsAsync(_connectionString, claimTimeout, cancellationToken);

        // Process new messages
        var newMessages = await _databaseProvider.ClaimAndRetrieveMessagesBatchAsync(_connectionString, _batchSize, claimTimeout, cancellationToken);
        var newMessagesProcessed = await ProcessMessagesAsync(newMessages, MessageType.New, cancellationToken);

        // Process retry messages
        var retryMessages = await _databaseProvider.ClaimAndRetrieveRetryMessagesAsync(_connectionString, _batchSize, cancellationToken);
        var retryMessagesProcessed = await ProcessMessagesAsync(retryMessages, MessageType.Retry, cancellationToken);

        var totalProcessed = newMessagesProcessed + retryMessagesProcessed;
        if (totalProcessed > 0)
        {
            _logger.LogInformation("Processed {TotalCount} messages from outbox ({NewCount} new, {RetryCount} retry)", 
                totalProcessed, newMessagesProcessed, retryMessagesProcessed);
        }

        return totalProcessed;
    }

    private async Task<int> ProcessMessagesAsync(List<OutboxMessageEntity> messages, MessageType messageType, CancellationToken cancellationToken)
    {
        if (messages.Count == 0) return 0;


        var updateQueue = new ConcurrentQueue<OutboxUpdate>();

        var publishTasks = messages
            .Select(message => PublishMessageWithRetryAsync(message, updateQueue, _publish, _logger, cancellationToken))
            .ToList();

        await Task.WhenAll(publishTasks);

        if (!updateQueue.IsEmpty)
        {
            await _databaseProvider.UpdateProcessedMessagesAsync(_connectionString, updateQueue, cancellationToken);
        }
        else
        {
            // If no messages were successfully processed, release the claims
            _logger.LogWarning("No {MessageType} messages were successfully processed, releasing claims", messageType.GetDescription());
            await _databaseProvider.ReleaseClaimsAsync(_connectionString, messages.Select(m => m.Id), cancellationToken);
        }

        return messages.Count;
    }

    private static async Task PublishMessageWithRetryAsync(
        OutboxMessageEntity message,
        ConcurrentQueue<OutboxUpdate> updateQueue,
        IPublishEndpoint publish,
        ILogger<OutboxProcessor> logger,
        CancellationToken cancellationToken)
    {
        try
        {
            
            var eventType = GetOrAddMessageType(message.EventType!);
            var deserializedMessage = JsonSerializer.Deserialize(message.Content!, eventType)!;

            logger.LogInformation("Publishing message {Id} of type {EventType} (attempt {AttemptCount}/{MaxAttempts})", 
                message.Id, message.EventType, message.AttemptCount + 1, message.MaxAttempts);
            
            await publish.Publish(deserializedMessage, cancellationToken);
            
            // Increment attempt count for successful publish
            message.IncreaseAttemptCount();
            
            logger.LogInformation("Successfully published message {Id} of type {EventType} (attempt {AttemptCount})", 
                message.Id, message.EventType, message.AttemptCount);

            // Success - mark as processed
            updateQueue.Enqueue(new OutboxUpdate(message.Id, DateTime.UtcNow, null, message.AttemptCount, null));
        }
        catch (Exception ex)
        {
            var currentTime = DateTimeOffset.UtcNow;
            message.RecordFailedAttempt(ex.ToString(), currentTime);

            if (message.IsPermanentlyFailed())
            {
                // Max attempts reached - mark as permanently failed
                updateQueue.Enqueue(new OutboxUpdate(message.Id, DateTime.UtcNow, message.LastErrorMessage, message.AttemptCount, null));
                logger.LogError(ex, "Permanently failed to publish outbox message {Id} after {AttemptCount} attempts", 
                    message.Id, message.AttemptCount);
            }
            else
            {
                // Schedule for retry
                updateQueue.Enqueue(new OutboxUpdate(message.Id, DateTime.UtcNow, message.LastErrorMessage, message.AttemptCount, message.NextAttemptOnUtc));
                logger.LogWarning(ex, "Failed to publish outbox message {Id} (attempt {AttemptCount}/{MaxAttempts}), will retry at {NextAttemptOnUtc}", 
                    message.Id, message.AttemptCount, message.MaxAttempts, message.NextAttemptOnUtc);
            }
        }
    }

    private static Type GetOrAddMessageType(string typename)
    {
        return TypeCache.GetOrAdd(typename, name => Type.GetType(name)!);
    }

    #endregion
}
