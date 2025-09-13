#region using

using Basket.Application.Repositories;
using Basket.Domain.Entities;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;

#endregion

namespace Basket.Infrastructure.Repositories;

public sealed class CachedBasketRepository(IBasketRepository repository, IDistributedCache cache) : IBasketRepository
{
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
            return JsonConvert.DeserializeObject<ShoppingCartEntity>(cachedBasket)!;

        var basket = await repository.GetBasketAsync(userId, cancellationToken);
        await cache.SetStringAsync(userId, JsonConvert.SerializeObject(basket), cancellationToken);

        return basket;
    }

    public async Task<bool> StoreBasketAsync(string userId, ShoppingCartEntity cart, CancellationToken cancellationToken = default)
    {
        await repository.StoreBasketAsync(userId, cart, cancellationToken);
        await cache.SetStringAsync(userId, JsonConvert.SerializeObject(cart), cancellationToken);
        
        return true;
    }

    #endregion
}
