#region using

using Common.Configurations;
using Catalog.Domain.Entities;
using Catalog.Worker.Outbox.Structs;
using MassTransit;
using System.Collections.Concurrent;
using System.Text.Json;
using Catalog.Application.Repositories;

#endregion

namespace Catalog.Worker.Outbox.Processors;

internal sealed class OutboxProcessor
{
    #region Fields, Properties and Indexers

    private readonly int _batchSize;

    private static readonly ConcurrentDictionary<string, Type> TypeCache = new();

    private readonly IOutboxRepository _outboxRepo;

    private readonly IPublishEndpoint _publish;

    private readonly ILogger<OutboxProcessor> _logger;

    #endregion

    #region Ctors

    public OutboxProcessor(
        IOutboxRepository outboxRepo,
        IConfiguration cfg,
        IPublishEndpoint publish,
        ILogger<OutboxProcessor> logger)
    {
        _batchSize = cfg.GetValue<int>($"{WorkerCfg.Outbox.Section}:{WorkerCfg.Outbox.BatchSize}", 1000);
        _outboxRepo = outboxRepo;
        _publish = publish;
        _logger = logger;
    }

    #endregion

    #region Methods

    public async Task<int> ExecuteAsync(CancellationToken cancellationToken = default)
    {
        // Process both new messages and retry messages
        var newMessages = await _outboxRepo.GetAndClaimMessagesAsync(_batchSize, cancellationToken);
        var retryMessages = await _outboxRepo.GetAndClaimRetryMessagesAsync(_batchSize, cancellationToken);

        var allMessages = newMessages.Concat(retryMessages).ToList();

        if (allMessages.Count == 0) return 0;

        var updateQueue = new ConcurrentQueue<OutboxUpdate>();

        var publishTasks = allMessages
            .Select(message => ProcessMessageAsync(message, updateQueue, _publish, _logger, cancellationToken))
            .ToList();

        await Task.WhenAll(publishTasks);

        if (!updateQueue.IsEmpty)
        {
            // Convert OutboxUpdate to OutboxMessageEntity for bulk update
            var messagesToUpdate = updateQueue.Select(update =>
            {
                var message = allMessages.First(m => m.Id == update.Id);
                if (update.ProcessedOnUtc != default)
                {
                    message.CompleteProcessing(update.ProcessedOnUtc, update.LastErrorMessage);
                }
                else
                {
                    // Retry case - update retry properties
                    message.ClaimedOnUtc = null;
                    message.SetRetryProperties(
                        update.AttemptCount,
                        message.MaxAttempts,
                        update.NextAttemptOnUtc,
                        update.LastErrorMessage);
                }
                return message;
            }).ToList();

            await _outboxRepo.UpdateMessagesAsync(messagesToUpdate, cancellationToken);
        }
        else
        {
            // If no messages were successfully processed, release the claims
            _logger.LogWarning("No messages were successfully processed, releasing claims");
            await _outboxRepo.ReleaseClaimsAsync(allMessages, cancellationToken);
        }

        if (allMessages.Count > 0)
        {
            _logger.LogInformation("Processed {Count} messages from outbox", allMessages.Count);
        }

        return allMessages.Count;
    }

    private static async Task ProcessMessageAsync(
        OutboxMessageEntity message,
        ConcurrentQueue<OutboxUpdate> updateQueue,
        IPublishEndpoint publish,
        ILogger<OutboxProcessor> logger,
        CancellationToken cancellationToken)
    {
        try
        {
            var messageType = GetOrAddMessageType(message.EventType!);
            var deserializedMessage = JsonSerializer.Deserialize(message.Content!, messageType)!;

            logger.LogInformation("Publishing message {Id} of type {EventType} (attempt {AttemptCount}/{MaxAttempts})",
                message.Id, message.EventType, message.AttemptCount, message.MaxAttempts);

            await publish.Publish(deserializedMessage, cancellationToken);

            // Increment attempt count for successful publish
            message.IncreaseAttemptCount();

            logger.LogInformation("Successfully published message {Id} of type {EventType} (attempt {AttemptCount})",
                message.Id, message.EventType, message.AttemptCount);

            // Success - mark as processed
            updateQueue.Enqueue(new OutboxUpdate(
                message.Id,
                DateTimeOffset.UtcNow,
                null,
                message.AttemptCount,
                null));
        }
        catch (Exception ex)
        {
            var currentTime = DateTimeOffset.UtcNow;
            message.RecordFailedAttempt(ex.ToString(), currentTime);

            if (message.IsPermanentlyFailed())
            {
                // Permanently failed - mark as processed with error
                updateQueue.Enqueue(new OutboxUpdate(
                    message.Id,
                    currentTime,
                    message.LastErrorMessage,
                    message.AttemptCount,
                    null));

                logger.LogError(ex, "Permanently failed to publish outbox message {Id} after {AttemptCount} attempts",
                    message.Id, message.AttemptCount);
            }
            else
            {
                // Schedule for retry
                updateQueue.Enqueue(new OutboxUpdate(
                    message.Id,
                    currentTime,
                    message.LastErrorMessage,
                    message.AttemptCount,
                    message.NextAttemptOnUtc));

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
