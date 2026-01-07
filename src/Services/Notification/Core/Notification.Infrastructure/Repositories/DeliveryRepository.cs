#region using

using MongoDB.Driver;
using Notification.Application.Data.Repositories;
using Notification.Domain.Entities;
using Notification.Domain.Enums;
using Notification.Infrastructure.Constants;

#endregion

namespace Notification.Infrastructure.Repositories;

public sealed class DeliveryRepository : ICommandDeliveryRepository, IQueryDeliveryRepository
{
    #region Fields, Properties and Indexers

    private readonly IMongoCollection<DeliveryEntity> _collection;

    #endregion

    #region Ctors

    public DeliveryRepository(IMongoDatabase db)
    {
        _collection = db.GetCollection<DeliveryEntity>(MongoCollection.Delivery);
    }

    #endregion

    #region Implementations

    public async Task<IReadOnlyList<DeliveryEntity>> GetDueAsync(
        DateTimeOffset now,
        int batchSize,
        CancellationToken cancellationToken = default)
    {
        var filterBuilder = Builders<DeliveryEntity>.Filter;
        var queuedDue = filterBuilder.And(
            filterBuilder.Eq(x => x.Status, DeliveryStatus.Queued),
            filterBuilder.Or(
                filterBuilder.Eq(x => x.NextAttemptUtc, null),
                filterBuilder.Lte(x => x.NextAttemptUtc, now)
            )
        );
        var failedDue = filterBuilder.And(
            filterBuilder.Eq(x => x.Status, DeliveryStatus.Failed),
            filterBuilder.Ne(x => x.NextAttemptUtc, null),
            filterBuilder.Lte(x => x.NextAttemptUtc, now)
        );
        var filter = filterBuilder.Or(queuedDue, failedDue);
        var sort = Builders<DeliveryEntity>.Sort
            .Ascending(x => x.NextAttemptUtc)
            .Descending(x => x.Priority)
            .Ascending(x => x.CreatedOnUtc);

        return await _collection.Find(filter)
            .Sort(sort)
            .Limit(batchSize)
            .ToListAsync(cancellationToken);
    }

    public async Task InsertManyAsync(IEnumerable<DeliveryEntity> docs, CancellationToken cancellationToken = default)
    {
        await _collection.InsertManyAsync(docs, cancellationToken: cancellationToken);
    }

    public async Task UpsertAsync(DeliveryEntity doc, CancellationToken cancellationToken = default)
    {
        var filter = Builders<DeliveryEntity>.Filter.Eq(x => x.Id, doc.Id);

        await _collection.ReplaceOneAsync(
            filter: filter,
            replacement: doc,
            options: new ReplaceOptions { IsUpsert = true },
            cancellationToken: cancellationToken
        );
    }

    public async Task<DeliveryEntity?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var filter = Builders<DeliveryEntity>.Filter.Eq(x => x.Id, id);

        return await _collection.Find(filter).SingleOrDefaultAsync(cancellationToken);
    }

    public async Task<DeliveryEntity> GetByEventIdAsync(string eventId, CancellationToken cancellationToken = default)
    {
        var filter = Builders<DeliveryEntity>.Filter.Eq(x => x.EventId, eventId);

        return await _collection.Find(filter).SingleOrDefaultAsync(cancellationToken);
    }

    #endregion
}
