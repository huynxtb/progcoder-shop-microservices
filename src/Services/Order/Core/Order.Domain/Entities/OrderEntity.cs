#region using

using Order.Domain.Abstractions;
using Order.Domain.Enums;
using Order.Domain.ValueObjects;

#endregion

namespace Order.Domain.Entities;

public sealed class OrderEntity : Aggregate<Guid>
{
    #region Fields, Properties and Indexers

    private readonly List<OrderItemEntity> _orderItems = new();

    public IReadOnlyList<OrderItemEntity> OrderItems => _orderItems.AsReadOnly();

    public Customer Customer { get; private set; } = default!;

    public OrderNo OrderNo { get; private set; } = default!;

    public Address ShippingAddress { get; private set; } = default!;

    public OrderStatus Status { get; private set; } = OrderStatus.Pending;

    public decimal TotalPrice
    {
        get => OrderItems.Sum(x => x.Product.Price * x.Quantity);
        private set { }
    }

    #endregion

    public static OrderEntity Create(Guid id, Customer customer, OrderNo orderNo, Address shippingAddress, string performedBy)
    {
        var order = new OrderEntity
        {
            Id = id,
            Customer = customer,
            OrderNo = orderNo,
            ShippingAddress = shippingAddress,
            Status = OrderStatus.Pending,
            CreatedBy = performedBy,
            LastModifiedBy = performedBy
        };

        //order.AddDomainEvent(new OrderCreatedEvent(order));

        return order;
    }

    public void UpdateShippingAddress(Address shippingAddress)
    {
        ShippingAddress = shippingAddress;

        //AddDomainEvent(new OrderUpdatedEvent(this));
    }

    public void UpdateCustomerInfo(Customer customer)
    {
        Customer = customer;

        //AddDomainEvent(new OrderUpdatedEvent(this));
    }

    public void AddOrderItem(Product product, int quantity)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(quantity);
        
        var orderItemId = Guid.NewGuid();
        var orderItem = OrderItemEntity.Create(orderItemId, Id, product, quantity, CreatedBy!);
        _orderItems.Add(orderItem);
    }

    public void RemoveOrderItem(Guid productId)
    {
        var orderItem = _orderItems.FirstOrDefault(x => x.Product.Id == productId);
        if (orderItem is not null)
        {
            _orderItems.Remove(orderItem);
        }
    }
}