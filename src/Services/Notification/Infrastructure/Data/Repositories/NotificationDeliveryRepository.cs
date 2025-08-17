#region using

using MongoDB.Driver;
using Notification.Application.Data.Repositories;
using Notification.Domain.Entities;
using Notification.Domain.Enums;

#endregion

namespace Notification.Infrastructure.Data.Repositories;

public sealed class NotificationDeliveryRepository(IMongoCollection<NotificationDelivery> collection) 
    : INotificationDeliveryRepository
{
    #region Implementations

    public async Task<IReadOnlyList<NotificationDelivery>> GetDueAsync(
        DateTimeOffset now, 
        int batchSize, 
        CancellationToken ctcancellationToken = default)
    {
        var filter = Builders<NotificationDelivery>.Filter.Or(
            Builders<NotificationDelivery>.Filter.And(
                Builders<NotificationDelivery>.Filter.Eq(x => (int)x.Status, (int)DeliveryStatus.Queued)
                //Builders<NotificationDelivery>.Filter.Or(
                //    Builders<NotificationDelivery>.Filter.Eq(x => x.NextAttemptUtc, null),
                //    Builders<NotificationDelivery>.Filter.Lte(x => x.NextAttemptUtc, nowUtc)
                //)
            ),
            Builders<NotificationDelivery>.Filter.And(
                Builders<NotificationDelivery>.Filter.Eq(x => (int)x.Status, (int)DeliveryStatus.Queued)
                //Builders<NotificationDelivery>.Filter.Ne(x => x.NextAttemptUtc, null),
                //Builders<NotificationDelivery>.Filter.Lte(x => x.NextAttemptUtc, nowUtc)
            )
        );

        var sort = Builders<NotificationDelivery>.Sort
            .Ascending(x => x.CreatedOnUtc)
            .Ascending(x => x.Priority);

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

    #endregion
}
