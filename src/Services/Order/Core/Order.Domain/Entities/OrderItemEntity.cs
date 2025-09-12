#region using

using Order.Domain.Abstractions;
using Order.Domain.ValueObjects;

#endregion

namespace Order.Domain.Entities;

public sealed class OrderItemEntity : Entity<Guid>
{
    #region Fields, Properties and Indexers

    public Guid OrderId { get; private set; } = default!;

    public Product Product { get; private set; } = default!;

    public int Quantity { get; private set; } = default!;

    #endregion

    #region Ctors

    private OrderItemEntity() { }

    #endregion

    #region Methods

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