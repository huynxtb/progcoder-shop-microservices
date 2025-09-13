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
        
        await sc.Indexes.CreateOneAsync(new CreateIndexModel<ShoppingCartEntity>(
            Builders<ShoppingCartEntity>.IndexKeys
                .Ascending(x => x.UserId),
            new CreateIndexOptions { Unique = true }));
    }

    #endregion
}
