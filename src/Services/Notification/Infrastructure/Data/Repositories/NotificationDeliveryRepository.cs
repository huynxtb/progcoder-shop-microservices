#region using

using MongoDB.Driver;
using Notification.Application.Data.Repositories;
using Notification.Domain.Entities;
using Notification.Domain.Enums;

#endregion

namespace Notification.Infrastructure.Data.Repositories;

public sealed class NotificationDeliveryRepository(IMongoCollection<NotificationDelivery> collection) 
    : ICommandNotificationDeliveryRepository, IQueryNotificationDeliveryRepository
{
    #region Implementations

    public async Task<IReadOnlyList<NotificationDelivery>> GetDueAsync(
        DateTimeOffset now, 
        int batchSize, 
        CancellationToken ctcancellationToken = default)
    {
        var filterBuilder = Builders<NotificationDelivery>.Filter;

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

        var sort = Builders<NotificationDelivery>.Sort
            .Ascending(x => x.NextAttemptUtc)
            .Descending(x => x.Priority)
            .Ascending(x => x.CreatedOnUtc);

        return await collection.Find(filter)
            .Sort(sort)
            .Limit(batchSize)
            .ToListAsync(ctcancellationToken);
    }

    public async Task InsertManyAsync(IEnumerable<NotificationDelivery> docs, CancellationToken cancellationToken = default)
    {
        await collection.InsertManyAsync(docs, cancellationToken: cancellationToken);
    }

    public async Task UpsertAsync(NotificationDelivery doc, CancellationToken cancellationToken = default)
    {
        var filter = Builders<NotificationDelivery>.Filter.Eq(x => x.Id, doc.Id);

        await collection.ReplaceOneAsync(
            filter: filter,
            replacement: doc,
            options: new ReplaceOptions { IsUpsert = true },
            cancellationToken: cancellationToken
        );
    }

    public async Task<NotificationDelivery> GetByEventIdAsync(string eventId, CancellationToken cancellationToken = default)
    {
        var filter = Builders<NotificationDelivery>.Filter.Eq(x => x.EventId, eventId);
        return await collection
            .Find(filter)
            .FirstOrDefaultAsync(cancellationToken);
    }

    #endregion
}
