#region using

using Catalog.Application.Repositories;
using Catalog.Domain.Entities;
using Marten;
using Microsoft.Extensions.Logging;

#endregion

namespace Catalog.Infrastructure.Repositories;

public class OutboxRepository(IDocumentSession session, ILogger<OutboxRepository> logger) : IOutboxRepository
{
    #region Implementations

    public async Task<bool> AddMessageAsync(OutboxMessageEntity message, CancellationToken cancellationToken = default)
    {
        logger.LogDebug("Adding outbox message {MessageId} of type {EventType}", message.Id, message.EventType);
        
        session.Store(message);
        await session.SaveChangesAsync(cancellationToken);
        
        logger.LogInformation("Successfully added outbox message {MessageId} of type {EventType}", message.Id, message.EventType);
        return true;
    }

    public async Task<bool> UpdateMessagesAsync(IEnumerable<OutboxMessageEntity> messages, CancellationToken cancellationToken = default)
    {
        var messageList = messages.ToList();
        logger.LogDebug("Updating {Count} outbox messages", messageList.Count);
        
        foreach (var message in messageList)
        {
            session.Store(message);
        }
        await session.SaveChangesAsync(cancellationToken);
        
        logger.LogInformation("Successfully updated {Count} outbox messages", messageList.Count);
        return true;
    }

    public async Task<List<OutboxMessageEntity>> GetAndClaimMessagesAsync(int batchSize, CancellationToken cancellationToken = default)
    {
        var now = DateTimeOffset.UtcNow;
        var claimTimeout = TimeSpan.FromMinutes(5);
        var expiredTime = now.Subtract(claimTimeout);

        logger.LogDebug("Attempting to claim up to {BatchSize} unprocessed outbox messages", batchSize);

        await session.BeginTransactionAsync(cancellationToken);

        try
        {
            // Query for unprocessed messages that are not claimed or have expired claims
            var messagesToClaim = await session.Query<OutboxMessageEntity>()
                .Where(x => x.ProcessedOnUtc == null 
                    && (x.ClaimedOnUtc == null || x.ClaimedOnUtc < expiredTime))
                .OrderBy(x => x.OccurredOnUtc)
                .Take(batchSize)
                .ToListAsync(cancellationToken);

            if (!messagesToClaim.Any())
            {
                await session.SaveChangesAsync(cancellationToken);
                logger.LogDebug("No unprocessed messages found to claim");
                return [];
            }

            // Claim the messages
            foreach (var message in messagesToClaim)
            {
                message.Claim(now);
                session.Store(message);
            }

            await session.SaveChangesAsync(cancellationToken);

            logger.LogInformation("Successfully claimed {Count} outbox messages", messagesToClaim.Count);
            return messagesToClaim.ToList();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error occurred while claiming outbox messages");
            throw;
        }
    }

    public async Task<List<OutboxMessageEntity>> GetAndClaimRetryMessagesAsync(int batchSize, CancellationToken cancellationToken = default)
    {
        var now = DateTimeOffset.UtcNow;
        var claimTimeout = TimeSpan.FromMinutes(5);
        var expiredTime = now.Subtract(claimTimeout);

        logger.LogDebug("Attempting to claim up to {BatchSize} retry outbox messages", batchSize);

        await session.BeginTransactionAsync(cancellationToken);

        try
        {
            // Query for retry messages
            // Note: Marten doesn't support null-coalescing in OrderBy, so we fetch a larger batch,
            // sort in memory to handle null NextAttemptOnUtc properly, then take the batch size
            var allRetryMessages = await session.Query<OutboxMessageEntity>()
                .Where(x => x.ProcessedOnUtc == null 
                    && x.AttemptCount < x.MaxAttempts
                    && (x.NextAttemptOnUtc == null || x.NextAttemptOnUtc <= now)
                    && (x.ClaimedOnUtc == null || x.ClaimedOnUtc < expiredTime))
                .OrderBy(x => x.OccurredOnUtc) // Initial ordering for database query
                .Take(batchSize * 2) // Fetch more to ensure correct sorting after in-memory sort
                .ToListAsync(cancellationToken);
            
            // Sort in memory to handle null NextAttemptOnUtc properly (use OccurredOnUtc as fallback)
            var retryMessages = allRetryMessages
                .OrderBy(x => x.NextAttemptOnUtc ?? x.OccurredOnUtc)
                .ThenBy(x => x.OccurredOnUtc)
                .Take(batchSize)
                .ToList();

            if (!retryMessages.Any())
            {
                await session.SaveChangesAsync(cancellationToken);
                logger.LogDebug("No retry messages found to claim");
                return [];
            }

            // Claim the messages
            foreach (var message in retryMessages)
            {
                message.Claim(now);
                session.Store(message);
            }

            await session.SaveChangesAsync(cancellationToken);

            logger.LogInformation("Successfully claimed {Count} retry outbox messages", retryMessages.Count);
            return retryMessages.ToList();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error occurred while claiming retry outbox messages");
            // Transaction will be rolled back automatically
            throw;
        }
    }

    public async Task<bool> ReleaseExpiredClaimsAsync(TimeSpan claimTimeout, CancellationToken cancellationToken = default)
    {
        var expiredTime = DateTimeOffset.UtcNow.Subtract(claimTimeout);

        logger.LogDebug("Releasing expired claims older than {ExpiredTime}", expiredTime);

        var expiredMessages = await session.Query<OutboxMessageEntity>()
            .Where(x => x.ProcessedOnUtc == null 
                && x.ClaimedOnUtc != null 
                && x.ClaimedOnUtc < expiredTime)
            .ToListAsync(cancellationToken);

        if (!expiredMessages.Any())
        {
            logger.LogDebug("No expired claims found to release");
            return true;
        }

        foreach (var message in expiredMessages)
        {
            message.ClaimedOnUtc = null;
            session.Store(message);
        }

        await session.SaveChangesAsync(cancellationToken);

        logger.LogInformation("Successfully released {Count} expired claims", expiredMessages.Count);
        return true;
    }

    public async Task<bool> ReleaseClaimsAsync(IEnumerable<OutboxMessageEntity> messages, CancellationToken cancellationToken = default)
    {
        var messageList = messages.ToList();
        logger.LogDebug("Releasing claims for {Count} outbox messages", messageList.Count);

        foreach (var message in messageList)
        {
            message.ClaimedOnUtc = null;
            session.Store(message);
        }

        await session.SaveChangesAsync(cancellationToken);
        
        logger.LogInformation("Successfully released claims for {Count} outbox messages", messageList.Count);
        return true;
    }

    #endregion
}

