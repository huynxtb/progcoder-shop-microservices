#region using

using Basket.Domain.Abstractions;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

#endregion

namespace Basket.Domain.Entities;

public sealed class ShoppingCartEntity : IEntityId<Guid>
{
    #region Fields, Properties and Indexers

    private readonly List<ShoppingCartItemEntity> _items = new();

    [BsonId]
    [BsonRepresentation(BsonType.String)]
    public Guid Id { get; set; }

    public string UserId { get; set; } = default!;

    // Expose as read-only to preserve invariants
    public IReadOnlyCollection<ShoppingCartItemEntity> Items => _items;

    public decimal TotalPrice => _items.Sum(x => x.Price * x.Quantity);

    #endregion

    #region Ctors

    public ShoppingCartEntity(string userId)
    {
        UserId = userId;
    }

    // Required for serializers / ORMs
    public ShoppingCartEntity()
    {
    }

    #endregion

    #region Methods

    public ShoppingCartItemEntity AddItem(
        Guid productId,
        string productName,
        decimal price,
        int quantity = 1,
        string? color = null)
    {
        GuardProduct(productId);
        GuardProductName(productName);
        GuardPrice(price);
        GuardQuantity(quantity);

        var normalizedColor = color?.Trim() ?? string.Empty;

        var existing = FindItem(productId, normalizedColor);
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
            Quantity = quantity,
            Color = normalizedColor
        };

        _items.Add(item);
        return item;
    }

    public bool RemoveItem(Guid productId, string? color = null)
    {
        var existing = FindItem(productId, color);
        if (existing is null) return false;
        _items.Remove(existing);
        return true;
    }

    public bool UpdateQuantity(Guid productId, int quantity, string? color = null)
    {
        var existing = FindItem(productId, color);
        if (existing is null) return false;

        if (quantity <= 0)
        {
            _items.Remove(existing);
            return true;
        }

        GuardQuantity(quantity);
        existing.Quantity = quantity;
        return true;
    }

    public void Clear() => _items.Clear();

    private ShoppingCartItemEntity? FindItem(Guid productId, string? color)
    {
        var normalizedColor = color?.Trim() ?? string.Empty;
        return _items.FirstOrDefault(x =>
            x.ProductId == productId &&
            string.Equals(x.Color ?? string.Empty, normalizedColor, StringComparison.OrdinalIgnoreCase));
    }

    #endregion

    #region Validation

    private static void GuardQuantity(int quantity)
    {
        if (quantity <= 0)
            throw new ArgumentOutOfRangeException(nameof(quantity), "Quantity must be greater than zero.");
    }

    private static void GuardPrice(decimal price)
    {
        if (price < 0)
            throw new ArgumentOutOfRangeException(nameof(price), "Price cannot be negative.");
    }

    private static void GuardProduct(Guid productId)
    {
        if (productId == Guid.Empty)
            throw new ArgumentException("ProductId cannot be empty.", nameof(productId));
    }

    private static void GuardProductName(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Product name is required.", nameof(name));
    }

    #endregion
}
