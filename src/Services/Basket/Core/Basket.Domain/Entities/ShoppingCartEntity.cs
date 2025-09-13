#region using

using Basket.Domain.Abstractions;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

#endregion

namespace Basket.Domain.Entities;

public sealed class ShoppingCartEntity : IEntityId<Guid>
{
    #region Fields, Properties and Indexers

    private readonly List<ShoppingCartItemEntity> _items = [];

    [BsonId]
    [BsonRepresentation(BsonType.String)]
    public Guid Id { get; set; }

    public string UserId { get; set; } = default!;

    public IReadOnlyCollection<ShoppingCartItemEntity> Items => _items;

    public decimal TotalPrice => _items.Sum(x => x.Price * x.Quantity);

    #endregion

    #region Ctors

    public ShoppingCartEntity(string userId)
    {
        UserId = userId;
    }

    public ShoppingCartEntity()
    {
    }

    #endregion

    #region Methods

    public ShoppingCartItemEntity AddItem(
        Guid productId,
        string productName,
        decimal price,
        int quantity = 1)
    {
        var existing = FindItem(productId);
        
        if (existing is not null)
        {
            existing.Quantity += quantity;
            return existing;
        }

        var item = new ShoppingCartItemEntity
        {
            ProductId = productId,
            ProductName = productName,
            Price = price,
            Quantity = quantity
        };

        _items.Add(item);
        return item;
    }

    public bool RemoveItem(Guid productId)
    {
        var existing = FindItem(productId);
        if (existing is null) return false;
        _items.Remove(existing);
        return true;
    }

    public bool UpdateQuantity(Guid productId, int quantity)
    {
        var existing = FindItem(productId);
        
        if (existing is null) return false;

        if (quantity <= 0)
        {
            _items.Remove(existing);
            return true;
        }

        existing.Quantity = quantity;
        return true;
    }

    public void Clear() => _items.Clear();

    private ShoppingCartItemEntity? FindItem(Guid productId)
    {
        return _items.FirstOrDefault(x => x.ProductId == productId);
    }

    #endregion
}
