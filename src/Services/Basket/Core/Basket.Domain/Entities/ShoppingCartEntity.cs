#region using

using Basket.Domain.Abstractions;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

#endregion

namespace Basket.Domain.Entities;

public sealed class ShoppingCartEntity : Aggregate<Guid>
{
    #region Fields, Properties and Indexers

    public string UserId { get; set; } = default!;

    public List<ShoppingCartItemEntity> Items { get; set; } = new();

    public decimal TotalPrice => Items.Sum(x => x.LineTotal);

    #endregion

    #region Factories

    public static ShoppingCartEntity Create(string userId)
    {
        return new ShoppingCartEntity()
        {
            Id = Guid.NewGuid(),
            UserId = userId
        };
    }

    #endregion

    #region Operations

    public ShoppingCartItemEntity AddOrIncreaseItem(
        Guid productId,
        string productName,
        string productImage,
        decimal price,
        int quantity = 1)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(quantity);
        ArgumentOutOfRangeException.ThrowIfNegative(price);

        var existing = Find(productId);
        if (existing is not null)
        {
            existing.Increase(quantity);
            existing.UpdatePrice(price);
            existing.UpdateMeta(productName, productImage);
            return existing;
        }

        var item = ShoppingCartItemEntity.Create(productId, productName, productImage, price, quantity);
        Items.Add(item);
        return item;
    }

    public void UpdateQuantity(Guid productId, int quantity)
    {
        var existing = Find(productId);
        if (existing is null) return;

        if (quantity <= 0)
        {
            Items.Remove(existing);
            return;
        }

        existing.SetQuantity(quantity);
    }

    public void UpdatePrice(Guid productId, decimal price)
    {
        var existing = Find(productId);
        if (existing is null) return;
        existing.UpdatePrice(price);
    }

    public void RemoveItem(Guid productId)
    {
        var existing = Find(productId);
        if (existing is null) return;
        Items.Remove(existing);
    }

    public void Clear() => Items.Clear();

    #endregion

    #region Helpers

    private ShoppingCartItemEntity? Find(Guid productId) =>
        Items.FirstOrDefault(x => x.ProductId == productId);

    #endregion
}
