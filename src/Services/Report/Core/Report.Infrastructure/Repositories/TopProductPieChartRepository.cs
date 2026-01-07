#region using

using MongoDB.Driver;
using Report.Application.Data.Repositories;
using Report.Domain.Entities;
using Report.Infrastructure.Constants;

#endregion

namespace Report.Infrastructure.Repositories;

public sealed class TopProductPieChartRepository : ITopProductPieChartRepository
{
    #region Fields, Properties and Indexers

    private readonly IMongoCollection<TopProductPieChartEntity> _collection;

    #endregion

    #region Ctors

    public TopProductPieChartRepository(IMongoDatabase db)
    {
        _collection = db.GetCollection<TopProductPieChartEntity>(MongoCollection.TopProductPieChart);
    }

    #endregion

    #region Implementations

    public async Task<List<TopProductPieChartEntity>> GetTopProductsAsync(int limit = 5, CancellationToken cancellationToken = default)
    {
        return await _collection.Find(_ => true)
            .SortByDescending(x => x.Value)
            .Limit(limit)
            .ToListAsync(cancellationToken);
    }

    public async Task BulkUpsertAsync(List<TopProductPieChartEntity> entities, CancellationToken cancellationToken = default)
    {
        var models = new List<WriteModel<TopProductPieChartEntity>>();

        foreach (var entity in entities)
        {
            var filter = Builders<TopProductPieChartEntity>.Filter.Eq(x => x.Name, entity.Name);

            var update = Builders<TopProductPieChartEntity>.Update
                .Set(x => x.Name, entity.Name)
                .Set(x => x.Value, entity.Value)
                .Set(x => x.LastModifiedBy, entity.LastModifiedBy)
                .Set(x => x.LastModifiedOnUtc, entity.LastModifiedOnUtc)
                .SetOnInsert(x => x.Id, entity.Id == Guid.Empty ? Guid.NewGuid() : entity.Id)
                .SetOnInsert(x => x.CreatedBy, entity.CreatedBy)
                .SetOnInsert(x => x.CreatedOnUtc, entity.CreatedOnUtc);

            var updateModel = new UpdateOneModel<TopProductPieChartEntity>(filter, update)
            {
                IsUpsert = true
            };
            models.Add(updateModel);
        }

        if (models.Any())
        {
            await _collection.BulkWriteAsync(models, cancellationToken: cancellationToken);
        }
    }

    #endregion
}

