#region using

using Order.Domain.Abstractions;
using Order.Domain.ValueObjects;
using System.Diagnostics;

#endregion

namespace Order.Domain.Entities;

public sealed class OrderItemEntity : Entity<Guid>
{
    #region Fields, Properties and Indexers

    public Guid OrderId { get; set; } = default!;

    public Product Product { get; set; } = default!;

    public int Quantity { get; set; } = default!;

    public decimal LineTotal
    {
        get => Product.Price * Quantity;
        private set { }
    }
    
    #endregion

    #region Factories

    public static OrderItemEntity Create(Guid id, Guid orderId, Product product, int quantity, string performedBy)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(quantity);

        var orderItem = new OrderItemEntity
        {
            Id = id,
            OrderId = orderId,
            Product = product,
            Quantity = quantity,
            CreatedBy = performedBy,
            LastModifiedBy = performedBy
        };

        return orderItem;
    }

    #endregion
}