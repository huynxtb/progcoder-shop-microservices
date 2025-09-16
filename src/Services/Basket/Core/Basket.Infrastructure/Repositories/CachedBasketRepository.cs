#region using

using Basket.Application.Repositories;
using Basket.Domain.Entities;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;

#endregion

namespace Basket.Infrastructure.Repositories;

public sealed class CachedBasketRepository(IBasketRepository repository, IDistributedCache cache) : IBasketRepository
{
    #region Fields, Properties and Indexers

    private static readonly DistributedCacheEntryOptions _cacheOptions = new()
    {
        AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(1),
        SlidingExpiration = TimeSpan.FromHours(1)
    };

    #endregion

    #region Implementations

    public async Task<bool> DeleteBasketAsync(string userId, CancellationToken cancellationToken = default)
    {
        await repository.DeleteBasketAsync(userId, cancellationToken);
        await cache.RemoveAsync(userId, cancellationToken);

        return true;
    }

    public async Task<ShoppingCartEntity> GetBasketAsync(string userId, CancellationToken cancellationToken = default)
    {
        var cachedBasket = await cache.GetStringAsync(userId, cancellationToken);
        if (!string.IsNullOrEmpty(cachedBasket))
        {
            var result = JsonConvert.DeserializeObject<ShoppingCartEntity>(cachedBasket);
            return result!;
        }

        var basket = await repository.GetBasketAsync(userId, cancellationToken);
        await cache.SetStringAsync(userId, JsonConvert.SerializeObject(basket), _cacheOptions, cancellationToken);

        return basket;
    }

    public async Task<ShoppingCartEntity> StoreBasketAsync(string userId, ShoppingCartEntity cart, CancellationToken cancellationToken = default)
    {
        var basket = await repository.StoreBasketAsync(userId, cart, cancellationToken);
        await cache.SetStringAsync(userId, JsonConvert.SerializeObject(basket), _cacheOptions, cancellationToken);
        
        return basket;
    }

    #endregion
}
