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
            var replace = new ReplaceOneModel<TopProductPieChartEntity>(filter, entity)
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

