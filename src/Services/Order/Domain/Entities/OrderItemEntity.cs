#region using

using Order.Domain.Abstractions;
using Order.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

#endregion

namespace Order.Domain.Entities;

public sealed class OrderItemEntity : Entity<Guid>
{
    #region MyRegion

    public Guid OrderId { get; private set; } = default!;

    public Product Product { get; private set; } = default!;

    public int Quantity { get; private set; } = default!;

    public decimal Price { get; private set; } = default!;

    #endregion

    public OrderItemEntity(Guid orderId, Guid productId, int quantity, decimal price)
    {
        Id = orderId;
        OrderId = orderId;
        ProductId = productId;
        Quantity = quantity;
        Price = price;
    }

    
}