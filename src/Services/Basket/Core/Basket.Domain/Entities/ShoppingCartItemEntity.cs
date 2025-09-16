#region using

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

#endregion

namespace Basket.Domain.Entities;

public sealed class ShoppingCartItemEntity
{
    #region Fields, Properties and Indexers

    [BsonRepresentation(BsonType.String)]
    public Guid ProductId { get; set; } = default!;

    public string ProductName { get; set; } = default!;

    public string ProductImage { get; set; } = default!;

    public decimal Price { get; set; }

    public int Quantity { get; set; }

    public decimal LineTotal => Price * Quantity;

    #endregion

    #region Factories

    public static ShoppingCartItemEntity Create(
        Guid productId,
        string productName,
        string productImage,
        decimal price,
        int quantity)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(quantity);
        ArgumentOutOfRangeException.ThrowIfNegative(price);
        ArgumentException.ThrowIfNullOrWhiteSpace(productName);

        return new ShoppingCartItemEntity
        {
            ProductId = productId,
            ProductName = productName,
            ProductImage = productImage,
            Price = price,
            Quantity = quantity
        };
    }

    #endregion

    #region Methods

    public void Increase(int quantity)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(quantity);
        Quantity += quantity;
    }

    public void SetQuantity(int quantity)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(quantity);
        Quantity = quantity;
    }

    public void UpdatePrice(decimal price)
    {
        ArgumentOutOfRangeException.ThrowIfNegative(price);
        Price = price;
    }

    public void UpdateMeta(string name, string image)
    {
        if (!string.IsNullOrWhiteSpace(name)) ProductName = name;
        if (!string.IsNullOrWhiteSpace(image)) ProductImage = image;
    }

    #endregion
}
