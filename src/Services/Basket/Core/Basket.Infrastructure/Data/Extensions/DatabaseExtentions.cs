#region using

using Basket.Domain.Entities;
using Basket.Infrastructure.Constants;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;

#endregion

namespace Basket.Infrastructure.Data.Extensions;

public static class DatabaseExtentions
{
    #region Methods

    public static async Task EnsureIndexesAsync(this WebApplication app)
    {
        var db = app.Services.GetRequiredService<IMongoDatabase>();
        var sc = db.GetCollection<ShoppingCartEntity>(MongoCollection.ShoppingCart);
        var om = db.GetCollection<OutboxMessageEntity>(MongoCollection.OutboxMessage);

        await sc.Indexes.CreateOneAsync(new CreateIndexModel<ShoppingCartEntity>(
            Builders<ShoppingCartEntity>.IndexKeys
                .Ascending(x => x.UserId),
            new CreateIndexOptions { Unique = true }));

        // Index for processing order (oldest first)
        await om.Indexes.CreateOneAsync(new CreateIndexModel<OutboxMessageEntity>(
            Builders<OutboxMessageEntity>.IndexKeys
                .Ascending(x => x.OccurredOnUtc),
            new CreateIndexOptions { Unique = false }));

        // Index for event type filtering
        await om.Indexes.CreateOneAsync(new CreateIndexModel<OutboxMessageEntity>(
            Builders<OutboxMessageEntity>.IndexKeys
                .Ascending(x => x.EventType),
            new CreateIndexOptions { Unique = false }));

        // Index for processed status
        await om.Indexes.CreateOneAsync(new CreateIndexModel<OutboxMessageEntity>(
            Builders<OutboxMessageEntity>.IndexKeys
                .Ascending(x => x.ProcessedOnUtc),
            new CreateIndexOptions { Unique = false }));

        // Index for claim status
        await om.Indexes.CreateOneAsync(new CreateIndexModel<OutboxMessageEntity>(
            Builders<OutboxMessageEntity>.IndexKeys
                .Ascending(x => x.ClaimedOnUtc),
            new CreateIndexOptions { Unique = false }));

        // Compound index for unprocessed and unclaimed messages
        await om.Indexes.CreateOneAsync(new CreateIndexModel<OutboxMessageEntity>(
            Builders<OutboxMessageEntity>.IndexKeys
                .Ascending(x => x.ProcessedOnUtc)
                .Ascending(x => x.ClaimedOnUtc),
            new CreateIndexOptions { Unique = false }));

        // Compound index for retry messages (next attempt time, processed status, attempt count)
        await om.Indexes.CreateOneAsync(new CreateIndexModel<OutboxMessageEntity>(
            Builders<OutboxMessageEntity>.IndexKeys
                .Ascending(x => x.NextAttemptOnUtc)
                .Ascending(x => x.ProcessedOnUtc)
                .Ascending(x => x.AttemptCount),
            new CreateIndexOptions { Unique = false }));

        // Compound index for retry eligibility (processed status, attempt count, max attempts)
        await om.Indexes.CreateOneAsync(new CreateIndexModel<OutboxMessageEntity>(
            Builders<OutboxMessageEntity>.IndexKeys
                .Ascending(x => x.ProcessedOnUtc)
                .Ascending(x => x.AttemptCount)
                .Ascending(x => x.MaxAttempts),
            new CreateIndexOptions { Unique = false }));
    }

    #endregion
}
