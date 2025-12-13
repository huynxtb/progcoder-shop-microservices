#region using

using MongoDB.Driver;
using Report.Application.Data.Repositories;
using Report.Domain.Entities;
using Report.Infrastructure.Constants;

#endregion

namespace Report.Infrastructure.Repositories;

public sealed class OrderGrowthLineChartRepository : IOrderGrowthLineChartRepository
{
    #region Fields, Properties and Indexers

    private readonly IMongoCollection<OrderGrowthLineChartEntity> _collection;

    #endregion

    #region Ctors

    public OrderGrowthLineChartRepository(IMongoDatabase db)
    {
        _collection = db.GetCollection<OrderGrowthLineChartEntity>(MongoCollection.OrderGrowthLineChart);
    }

    #endregion

    #region Implementations

    public async Task<List<OrderGrowthLineChartEntity>> GetByMonthAsync(int year, int month, CancellationToken cancellationToken = default)
    {
        var startDate = new DateTime(year, month, 1);
        var endDate = startDate.AddMonths(1).AddDays(-1);

        var filter = Builders<OrderGrowthLineChartEntity>.Filter.And(
            Builders<OrderGrowthLineChartEntity>.Filter.Gte(x => x.Date, startDate),
            Builders<OrderGrowthLineChartEntity>.Filter.Lte(x => x.Date, endDate));

        return await _collection.Find(filter)
            .SortBy(x => x.Date)
            .ToListAsync(cancellationToken);
    }

    public async Task<List<OrderGrowthLineChartEntity>> GetByDateRangeAsync(DateTime startDate, DateTime endDate, CancellationToken cancellationToken = default)
    {
        var filter = Builders<OrderGrowthLineChartEntity>.Filter.And(
            Builders<OrderGrowthLineChartEntity>.Filter.Gte(x => x.Date, startDate),
            Builders<OrderGrowthLineChartEntity>.Filter.Lte(x => x.Date, endDate));

        return await _collection.Find(filter)
            .SortBy(x => x.Date)
            .ToListAsync(cancellationToken);
    }

    public async Task BulkUpsertAsync(List<OrderGrowthLineChartEntity> entities, CancellationToken cancellationToken = default)
    {
        var models = new List<WriteModel<OrderGrowthLineChartEntity>>();

        foreach (var entity in entities)
        {
            var filter = Builders<OrderGrowthLineChartEntity>.Filter.Eq(x => x.Date, entity.Date);
            
            var update = Builders<OrderGrowthLineChartEntity>.Update
                .Set(x => x.Day, entity.Day)
                .Set(x => x.Value, entity.Value)
                .Set(x => x.Date, entity.Date)
                .Set(x => x.LastModifiedBy, entity.LastModifiedBy)
                .Set(x => x.LastModifiedOnUtc, entity.LastModifiedOnUtc)
                .SetOnInsert(x => x.Id, entity.Id == Guid.Empty ? Guid.NewGuid() : entity.Id)
                .SetOnInsert(x => x.CreatedBy, entity.CreatedBy)
                .SetOnInsert(x => x.CreatedOnUtc, entity.CreatedOnUtc);
            
            var updateModel = new UpdateOneModel<OrderGrowthLineChartEntity>(filter, update)
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

