#region using

using OfficeOpenXml.Export.HtmlExport.StyleCollectors.StyleContracts;
using Order.Domain.Abstractions;
using Order.Domain.Enums;
using Order.Domain.Events;
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

    #region Ctors

    private OrderEntity() { }

    #endregion

    #region Methods

    public static OrderEntity Create(
        Guid id,
        Customer customer,
        OrderNo orderNo,
        Address shippingAddress)
    {
        var order = new OrderEntity
        {
            Id = id,
            OrderNo = orderNo,
            Customer = customer,
            ShippingAddress = shippingAddress
        };

       order.AddDomainEvent(new OrderCreatedDomainEvent(order));

        return order;
    }

    public void Update(Address shippingAddress, OrderStatus status)
    {
        ShippingAddress = shippingAddress;
        Status = status;
    }

    public void AddItem(Product product, int quantity)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(quantity);
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(product.Price);

        var orderItem = new OrderItemEntity(Id, product, quantity);
        _orderItems.Add(orderItem);
    }

    public void Remove(Guid productId)
    {
        var orderItem = _orderItems.FirstOrDefault(x => x.Product.Id == productId);
        if (orderItem is not null)
        {
            _orderItems.Remove(orderItem);
        }
    }

    #endregion

}