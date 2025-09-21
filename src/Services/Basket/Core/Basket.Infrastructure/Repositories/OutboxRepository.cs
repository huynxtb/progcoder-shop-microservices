#region using

using Basket.Application.Repositories;
using Basket.Domain.Entities;
using Basket.Infrastructure.Constants;
using MongoDB.Bson;
using MongoDB.Driver;

#endregion

namespace Basket.Infrastructure.Repositories;

public class OutboxRepository : IOutboxRepository
{
    #region Fields, Properties and Indexers

    private readonly IMongoCollection<OutboxMessageEntity> _collection;

    #endregion

    #region Ctors

    public OutboxRepository(IMongoDatabase db)
    {
        _collection = db.GetCollection<OutboxMessageEntity>(MongoCollection.OutboxMessage);
    }

    #endregion

    #region Implementations

    public async Task<bool> AddMessageAsync(OutboxMessageEntity message, CancellationToken cancellationToken = default)
    {
        var result = await _collection.ReplaceOneAsync(
            x => x.Id == message.Id,
            message,
            new ReplaceOptions { IsUpsert = true },
            cancellationToken);

        return result.IsAcknowledged;
    }

    public async Task<bool> UpdateMessagesAsync(IEnumerable<OutboxMessageEntity> messages, CancellationToken cancellationToken = default)
    {
        var bulkOperations = new List<WriteModel<OutboxMessageEntity>>();

        foreach (var message in messages)
        {
            var filter = Builders<OutboxMessageEntity>.Filter.Eq(x => x.Id, message.Id);
            var update = Builders<OutboxMessageEntity>.Update
                .Set(x => x.ProcessedOnUtc, message.ProcessedOnUtc)
                .Set(x => x.LastErrorMessage, message.LastErrorMessage)
                .Set(x => x.AttemptCount, message.AttemptCount)
                .Set(x => x.MaxAttempts, message.MaxAttempts)
                .Set(x => x.NextAttemptOnUtc, message.NextAttemptOnUtc)
                .Unset(x => x.ClaimedOnUtc);

            bulkOperations.Add(new UpdateOneModel<OutboxMessageEntity>(filter, update));
        }

        if (bulkOperations.Count == 0)
            return true;

        var result = await _collection.BulkWriteAsync(bulkOperations, cancellationToken: cancellationToken);

        return result.IsAcknowledged;
    }

    public async Task<List<OutboxMessageEntity>> GetAndClaimMessagesAsync(int batchSize, CancellationToken cancellationToken = default)
    {
        var now = DateTimeOffset.UtcNow;
        var claimTimeout = TimeSpan.FromMinutes(5);
        
        // First, release any expired claims
        await ReleaseExpiredClaimsAsync(claimTimeout, cancellationToken);
        
        var claimedMessages = new List<OutboxMessageEntity>();
        
        // Use atomic findOneAndUpdate in a loop to avoid race conditions
        // This ensures each message is claimed atomically, preventing duplicates
        for (int i = 0; i < batchSize; i++)
        {
            var filter = Builders<OutboxMessageEntity>.Filter.And(
                Builders<OutboxMessageEntity>.Filter.Eq(x => x.ProcessedOnUtc, null),
                Builders<OutboxMessageEntity>.Filter.Or(
                    Builders<OutboxMessageEntity>.Filter.Exists(x => x.ClaimedOnUtc, false),
                    Builders<OutboxMessageEntity>.Filter.Eq(x => x.ClaimedOnUtc, null)
                )
            );
            
            var update = Builders<OutboxMessageEntity>.Update
                .Set(x => x.ClaimedOnUtc, now);
            
            var options = new FindOneAndUpdateOptions<OutboxMessageEntity>
            {
                ReturnDocument = ReturnDocument.After,
                Sort = Builders<OutboxMessageEntity>.Sort.Ascending(x => x.OccurredOnUtc)
            };
            
            var claimedMessage = await _collection.FindOneAndUpdateAsync(filter, update, options, cancellationToken);
            
            if (claimedMessage == null)
                break; // No more messages to claim
                
            claimedMessages.Add(claimedMessage);
        }
        
        return claimedMessages;
    }

    public async Task<List<OutboxMessageEntity>> GetAndClaimRetryMessagesAsync(int batchSize, CancellationToken cancellationToken = default)
    {
        var now = DateTimeOffset.UtcNow;
        var claimTimeout = TimeSpan.FromMinutes(5);
        
        // First, release any expired claims
        await ReleaseExpiredClaimsAsync(claimTimeout, cancellationToken);
        
        var claimedMessages = new List<OutboxMessageEntity>();
        
        // Use atomic findOneAndUpdate in a loop to avoid race conditions
        // This ensures each retry message is claimed atomically, preventing duplicates
        for (int i = 0; i < batchSize; i++)
        {
            var filter = Builders<OutboxMessageEntity>.Filter.And(
                Builders<OutboxMessageEntity>.Filter.Eq(x => x.ProcessedOnUtc, null),
                Builders<OutboxMessageEntity>.Filter.Or(
                    Builders<OutboxMessageEntity>.Filter.Eq(x => x.NextAttemptOnUtc, null),
                    Builders<OutboxMessageEntity>.Filter.Lte(x => x.NextAttemptOnUtc, now)
                ),
                Builders<OutboxMessageEntity>.Filter.Or(
                    Builders<OutboxMessageEntity>.Filter.Exists(x => x.ClaimedOnUtc, false),
                    Builders<OutboxMessageEntity>.Filter.Eq(x => x.ClaimedOnUtc, null)
                )
            );
            
            var update = Builders<OutboxMessageEntity>.Update
                .Set(x => x.ClaimedOnUtc, now);
            
            var options = new FindOneAndUpdateOptions<OutboxMessageEntity>
            {
                ReturnDocument = ReturnDocument.After,
                Sort = Builders<OutboxMessageEntity>.Sort.Ascending(x => x.NextAttemptOnUtc).Ascending(x => x.OccurredOnUtc)
            };
            
            var claimedMessage = await _collection.FindOneAndUpdateAsync(filter, update, options, cancellationToken);
            
            if (claimedMessage == null)
                break; // No more messages to claim
            
            // Check if the message is eligible for retry (MongoDB doesn't support field-to-field comparison)
            if (claimedMessage.AttemptCount < claimedMessage.MaxAttempts)
            {
                claimedMessages.Add(claimedMessage);
            }
            else
            {
                // Message has exceeded max attempts, release the claim
                await _collection.UpdateOneAsync(
                    Builders<OutboxMessageEntity>.Filter.Eq(x => x.Id, claimedMessage.Id),
                    Builders<OutboxMessageEntity>.Update.Unset(x => x.ClaimedOnUtc),
                    cancellationToken: cancellationToken);
            }
        }
        
        return claimedMessages;
    }

    public async Task<bool> ReleaseExpiredClaimsAsync(TimeSpan claimTimeout, CancellationToken cancellationToken = default)
    {
        var now = DateTimeOffset.UtcNow;
        var expiredClaimFilter = Builders<OutboxMessageEntity>.Filter.And(
            Builders<OutboxMessageEntity>.Filter.Eq(x => x.ProcessedOnUtc, null),
            Builders<OutboxMessageEntity>.Filter.Exists(x => x.ClaimedOnUtc, true),
            Builders<OutboxMessageEntity>.Filter.Lt(x => x.ClaimedOnUtc, now.Subtract(claimTimeout))
        );
        
        var releaseUpdate = Builders<OutboxMessageEntity>.Update
            .Unset(x => x.ClaimedOnUtc);
        
        var result = await _collection.UpdateManyAsync(expiredClaimFilter, releaseUpdate, cancellationToken: cancellationToken);
        
        return result.IsAcknowledged;
    }

    public async Task<bool> ReleaseClaimsAsync(IEnumerable<OutboxMessageEntity> messages, CancellationToken cancellationToken = default)
    {
        var messageIds = messages.Select(m => m.Id).ToList();
        
        if (!messageIds.Any()) return true;
        
        var filter = Builders<OutboxMessageEntity>.Filter.In(x => x.Id, messageIds);
        var update = Builders<OutboxMessageEntity>.Update
            .Unset(x => x.ClaimedOnUtc);
        
        var result = await _collection.UpdateManyAsync(filter, update, cancellationToken: cancellationToken);
        
        return result.IsAcknowledged;
    }

    #endregion
}
