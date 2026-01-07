#region using

using Basket.Application.Repositories;
using Basket.Domain.Entities;
using MongoDB.Driver;

#endregion

namespace Basket.Infrastructure.Repositories;

public sealed class BasketRepository : BaseRepository<ShoppingCartEntity>, IBasketRepository
{
    #region Ctors

    public BasketRepository(IMongoDatabase db) : base(db)
    {
    }

    #endregion

    #region Implementations

    public async Task<bool> DeleteBasketAsync(string userId, CancellationToken cancellationToken = default)
    {
        var result = await _collection.DeleteOneAsync(x => x.UserId == userId, cancellationToken);
        return result.IsAcknowledged;
    }

    public async Task<ShoppingCartEntity> GetBasketAsync(string userId, CancellationToken cancellationToken = default)
    {
        var basket = await _collection
            .Find(x => x.UserId == userId)
            .FirstOrDefaultAsync(cancellationToken);

        return basket ?? ShoppingCartEntity.Create(userId);
    }

    public async Task<bool> StoreBasketAsync(string userId, ShoppingCartEntity cart, CancellationToken cancellationToken = default)
    {
        var result = await _collection.ReplaceOneAsync(
            x => x.UserId == userId,
            cart,
            new ReplaceOptions { IsUpsert = true },
            cancellationToken);

        return result.IsAcknowledged;
    }

    #endregion
}
