#region using

using Basket.Application.Repositories;
using Basket.Domain.Entities;
using Basket.Infrastructure.Constants;
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

    public async Task<bool> RaiseMessageAsync(OutboxMessageEntity message, CancellationToken cancellationToken = default)
    {
        var result = await _collection.ReplaceOneAsync(
            x => x.Id == message.Id,
            message,
            new ReplaceOptions { IsUpsert = true },
            cancellationToken);

        return result.IsAcknowledged;
    }

    public async Task<List<OutboxMessageEntity>> GetMessagesAsync(OutboxMessageEntity message, int batchSize, CancellationToken cancellationToken = default)
    {
        var filter = Builders<OutboxMessageEntity>.Filter.Where(x => x.ProcessedOnUtc == null);

        var result = await _collection
            .Find(filter)
            .Limit(batchSize)
            .ToListAsync(cancellationToken);

        return result;
    }

    public async Task<bool> UpdateMessagesAsync(IEnumerable<OutboxMessageEntity> messages, CancellationToken cancellationToken = default)
    {
        var bulkOperations = new List<WriteModel<OutboxMessageEntity>>();

        foreach (var message in messages)
        {
            var filter = Builders<OutboxMessageEntity>.Filter.Eq(x => x.Id, message.Id);
            var update = Builders<OutboxMessageEntity>.Update
                .Set(x => x.ProcessedOnUtc, message.ProcessedOnUtc)
                .Set(x => x.Error, message.Error);

            bulkOperations.Add(new UpdateOneModel<OutboxMessageEntity>(filter, update));
        }

        if (bulkOperations.Count == 0)
            return true;

        var result = await _collection.BulkWriteAsync(bulkOperations, cancellationToken: cancellationToken);

        return result.IsAcknowledged;
    }

    #endregion
}
