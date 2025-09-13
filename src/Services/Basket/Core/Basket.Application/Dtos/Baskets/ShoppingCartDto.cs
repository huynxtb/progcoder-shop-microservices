#region using

using Basket.Domain.Entities;

#endregion

namespace Basket.Application.Dtos.Baskets;

public class ShoppingCartDto
{
    #region Fields, Properties and Indexers

    public string UserId { get; set; } = default!;

    public List<ShoppingCartItemEntity> Items { get; set; } = default!;

    public decimal TotalPrice { get; set; }

    #endregion
}
