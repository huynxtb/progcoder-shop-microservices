#region using

using Basket.Application.Dtos.Baskets;

#endregion

namespace Basket.Application.Models.Results;

public sealed class GetBasketResult
{
    #region Fields, Properties and Indexers

    public ShoppingCartDto Basket { get; init; }

    #endregion

    #region Ctors

    public GetBasketResult(ShoppingCartDto basket)
    {
        Basket = basket;
    }

    #endregion
}
