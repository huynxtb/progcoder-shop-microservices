#region using

using Order.Domain.Abstractions;
using Order.Domain.ValueObjects;

#endregion

namespace Order.Domain.Entities;

public sealed class OrderItemEntity : Entity<Guid>
{
    #region Methods

    public Guid OrderId { get; private set; } = default!;

    public Product Product { get; private set; } = default!;

    public int Quantity { get; private set; } = default!;

    #endregion

    #region Ctors

    public OrderItemEntity(Guid orderId, Product product, int quantity)
    {
        Id = orderId;
        OrderId = orderId;
        Product = product;
        Quantity = quantity;
    }

    #endregion

}