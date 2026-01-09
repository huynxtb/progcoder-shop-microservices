#region using

using Common.ValueObjects;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using Report.Domain.Entities;
using Report.Domain.Enums;
using Report.Infrastructure.Constants;

#endregion

namespace Report.Infrastructure.Data.Extensions;

public static class DatabaseExtentions
{
    #region Methods

    public static async Task InitialiseDatabaseAsync(this WebApplication app)
    {
        var db = app.Services.GetRequiredService<IMongoDatabase>();
        var performedBy = Actor.System(AppConstants.Service.Report).ToString();

        await SeedDashboardTotalAsync(db, performedBy);
    }

    private static async Task SeedDashboardTotalAsync(IMongoDatabase db, string performedBy)
    {
        var collection = db.GetCollection<DashboardTotalEntity>(MongoCollection.DashboardTotal);
        var count = await collection.CountDocumentsAsync(FilterDefinition<DashboardTotalEntity>.Empty);

        if (count > 0) return;

        var models = new List<WriteModel<DashboardTotalEntity>>();
        var docs = new List<DashboardTotalEntity>()
        {
            DashboardTotalEntity.Create(
                title: DashboardTotalTitle.TotalRevenue.GetDescription(),
                count: "0",
                bg: "bg-[#E5F9FF] dark:bg-slate-900",
                text: "text-info-500",
                icon: "heroicons:cube",
                performedBy: performedBy),
            DashboardTotalEntity.Create(
                title: DashboardTotalTitle.TotalUsers.GetDescription(),
                count: "0",
                bg: "bg-[#A5F9FD] dark:bg-slate-900/50",
                text: "text-primary-500",
                icon: "heroicons:user-group",
                performedBy: performedBy),
            DashboardTotalEntity.Create(
                title: DashboardTotalTitle.TotalProducts.GetDescription(),
                count: "0",
                bg: "bg-[#FFEDE6] dark:bg-slate-900",
                text: "text-warning-500",
                icon: "heroicons:circle-stack",
                performedBy: performedBy),
            DashboardTotalEntity.Create(
                title: DashboardTotalTitle.TotalOrders.GetDescription(),
                count: "0",
                bg: "bg-[#EAE6FF] dark:bg-slate-900",
                text: "text-[#5743BE]",
                icon: "heroicons:shopping-cart",
                performedBy: performedBy)
        };

        foreach (var doc in docs)
        {
            var filter = Builders<DashboardTotalEntity>.Filter.Eq(x => x.Title, doc.Title);
            var replace = new ReplaceOneModel<DashboardTotalEntity>(filter, doc)
            {
                IsUpsert = true
            };

            models.Add(replace);
        }

        if (models.Any())
        {
            await collection.BulkWriteAsync(models);
        }
    }

    public static async Task EnsureIndexesAsync(this WebApplication app)
    {
        var db = app.Services.GetRequiredService<IMongoDatabase>();

        // Indexes for DashboardTotalEntity
        var dashboardTotalCollection = db.GetCollection<DashboardTotalEntity>(MongoCollection.DashboardTotal);
        await dashboardTotalCollection.Indexes.CreateOneAsync(
            new CreateIndexModel<DashboardTotalEntity>(
                Builders<DashboardTotalEntity>.IndexKeys.Ascending(x => x.Title),
                new CreateIndexOptions { Unique = true }));

        // Indexes for OrderGrowthLineChartEntity
        var orderGrowthCollection = db.GetCollection<OrderGrowthLineChartEntity>(MongoCollection.OrderGrowthLineChart);
        await orderGrowthCollection.Indexes.CreateOneAsync(
            new CreateIndexModel<OrderGrowthLineChartEntity>(
                Builders<OrderGrowthLineChartEntity>.IndexKeys
                    .Ascending(x => x.Date),
                new CreateIndexOptions { Unique = true }));

        await orderGrowthCollection.Indexes.CreateOneAsync(
            new CreateIndexModel<OrderGrowthLineChartEntity>(
                Builders<OrderGrowthLineChartEntity>.IndexKeys
                    .Descending(x => x.CreatedOnUtc)));

        // Indexes for TopProductPieChartEntity
        var topProductCollection = db.GetCollection<TopProductPieChartEntity>(MongoCollection.TopProductPieChart);
        await topProductCollection.Indexes.CreateOneAsync(
            new CreateIndexModel<TopProductPieChartEntity>(
                Builders<TopProductPieChartEntity>.IndexKeys
                    .Ascending(x => x.Name),
                new CreateIndexOptions { Unique = true }));

        await topProductCollection.Indexes.CreateOneAsync(
            new CreateIndexModel<TopProductPieChartEntity>(
                Builders<TopProductPieChartEntity>.IndexKeys
                    .Descending(x => x.Value)));
    }

    #endregion
}
