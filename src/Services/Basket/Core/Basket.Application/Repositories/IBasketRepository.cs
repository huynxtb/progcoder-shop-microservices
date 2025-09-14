#region using

using Basket.Domain.Entities;

#endregion

namespace Basket.Application.Repositories;

public interface IBasketRepository
{
    #region Methods

    Task<ShoppingCartEntity> GetBasketAsync(string userId, CancellationToken cancellationToken = default);

    Task<ShoppingCartEntity> StoreBasketAsync(string userId, ShoppingCartEntity cart, CancellationToken cancellationToken = default);

    Task<bool> DeleteBasketAsync(string userId, CancellationToken cancellationToken = default);

    #endregion
}
