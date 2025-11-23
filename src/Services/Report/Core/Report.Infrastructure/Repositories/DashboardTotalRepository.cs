#region using

using MongoDB.Driver;
using Report.Application.Data.Repositories;
using Report.Domain.Entities;
using Report.Infrastructure.Constants;

#endregion

namespace Report.Infrastructure.Repositories;

public sealed class DashboardTotalRepository : IDashboardTotalRepository
{
    #region Fields Properties and Indexers

    private readonly IMongoCollection<DashboardTotalEntity> _collection;

    #endregion

    #region Ctors

    public DashboardTotalRepository(IMongoDatabase db)
    {
        _collection = db.GetCollection<DashboardTotalEntity>(MongoCollection.DashboardTotal);
    }

    #endregion

    #region Implementations

    public async Task<List<DashboardTotalEntity>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _collection.Find(_ => true)
            .SortBy(x => x.Title)
            .ToListAsync(cancellationToken);
    }

    public async Task BulkUpsertAsync(List<DashboardTotalEntity> entities, CancellationToken cancellationToken = default)
    {
        var models = new List<WriteModel<DashboardTotalEntity>>();

        foreach (var entity in entities)
        {
            var filter = Builders<DashboardTotalEntity>.Filter.Eq(x => x.Title, entity.Title);
            var replace = new ReplaceOneModel<DashboardTotalEntity>(filter, entity)
            {
                IsUpsert = true
            };
            models.Add(replace);
        }

        if (models.Any())
        {
            await _collection.BulkWriteAsync(models, cancellationToken: cancellationToken);
        }
    }

    #endregion
}

