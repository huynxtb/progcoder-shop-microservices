#region using

using MongoDB.Driver;
using Notification.Application.Data.Repositories;
using Notification.Domain.Entities;
using Notification.Infrastructure.Constants;

#endregion

namespace Notification.Infrastructure.Repositories;

public sealed class NotificationRepository : ICommandNotificationRepository, IQueryNotificationRepository
{
    #region Fields, Properties and Indexers

    private readonly IMongoCollection<NotificationEntity> _collection;

    #endregion

    #region Ctors

    public NotificationRepository(IMongoDatabase db)
    {
        _collection = db.GetCollection<NotificationEntity>(MongoCollection.Notification);
    }

    #endregion

    #region Implementations

    public async Task<List<NotificationEntity>> GetNotificationsAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        var filterBuilder = Builders<NotificationEntity>.Filter;
        var finalFilter = filterBuilder.And(
            filterBuilder.Eq(x => x.UserId, (Guid?)userId),
            filterBuilder.Eq(x => x.IsRead, false)
        );
        var sort = Builders<NotificationEntity>.Sort
            .Descending(x => x.CreatedOnUtc);

        return await _collection.Find(finalFilter)
            .Sort(sort)
            .ToListAsync(cancellationToken);
    }

    public async Task<NotificationEntity> GetNotificationByIdAsync(Guid id, Guid userId, CancellationToken cancellationToken = default)
    {
        var filterBuilder = Builders<NotificationEntity>.Filter;
        var filter = filterBuilder.And(
            filterBuilder.Eq(x => x.UserId, (Guid?)userId),
            filterBuilder.Eq(x => x.Id, id)
        );

        return await _collection.Find(filter).SingleOrDefaultAsync(cancellationToken);
    }

    public async Task UpsertAsync(NotificationEntity doc, CancellationToken cancellationToken = default)
    {
        var filter = Builders<NotificationEntity>.Filter.Eq(x => x.Id, doc.Id);

        await _collection.ReplaceOneAsync(
            filter: filter,
            replacement: doc,
            options: new ReplaceOptions { IsUpsert = true },
            cancellationToken: cancellationToken
        );
    }

    #endregion

}
