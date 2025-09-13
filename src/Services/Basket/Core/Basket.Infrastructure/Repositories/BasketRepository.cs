#region using

using Basket.Application.Repositories;
using Basket.Domain.Entities;
using Basket.Infrastructure.Constants;
using MongoDB.Driver;

#endregion

namespace Basket.Infrastructure.Repositories;

public sealed class BasketRepository : IBasketRepository
{
    #region Fields, Properties and Indexers

    private readonly IMongoCollection<ShoppingCartEntity> _collection;

    #endregion

    #region Ctors

    public BasketRepository(IMongoDatabase db)
    {
        _collection = db.GetCollection<ShoppingCartEntity>(MongoCollection.ShoppingCart);
    }

    #endregion

    #region Implementations

    public async Task<bool> DeleteBasketAsync(string userId, CancellationToken cancellationToken = default)
    {
        var result = await _collection.DeleteOneAsync(x => x.UserId == userId, cancellationToken);
        return result.IsAcknowledged && result.DeletedCount > 0;
    }

    public async Task<ShoppingCartEntity> GetBasketAsync(string userId, CancellationToken cancellationToken = default)
    {
        var basket = await _collection
            .Find(x => x.UserId == userId)
            .FirstOrDefaultAsync(cancellationToken);

        return basket ?? new ShoppingCartEntity(userId);
    }

    public async Task<bool> StoreBasketAsync(string userId, ShoppingCartEntity cart, CancellationToken cancellationToken = default)
    {
        cart.UserId = userId;

        var result = await _collection.ReplaceOneAsync(
            x => x.UserId == userId,
            cart,
            new ReplaceOptions { IsUpsert = true },
            cancellationToken);

        return result.IsAcknowledged && (result.ModifiedCount > 0 || result.UpsertedId != null);
    }

    #endregion
}
