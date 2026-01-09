#region using

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

    public Customer Customer { get; set; } = default!;

    public OrderNo OrderNo { get; set; } = default!;

    public Address ShippingAddress { get; set; } = default!;

    //public Address BillingAddress { get; set; } = default!;

    public OrderStatus Status { get; set; } = OrderStatus.Pending;

    public Discount Discount { get; set; } = default!;

    public string? Notes { get; set; }

    public string? CancelReason { get; set; }

    public string? RefundReason { get; set; }

    public decimal TotalPrice
    {
        get => OrderItems.Sum(x => x.LineTotal);
        private set { }
    }

    public decimal FinalPrice
    {
        get
        {
            var discountAmount = Discount?.DiscountAmount ?? 0m;
            return Math.Max(0, OrderItems.Sum(x => x.LineTotal) - discountAmount);
        }
        private set { }
    }

    #endregion

    #region Factories

    public static OrderEntity Create(Guid id,
        Customer customer,
        OrderNo orderNo,
        Address shippingAddress,
        string? notes,
        string performedBy)
    {
        var order = new OrderEntity
        {
            Id = id,
            Customer = customer,
            OrderNo = orderNo,
            ShippingAddress = shippingAddress,
            Status = OrderStatus.Pending,
            Notes = notes,
            CreatedBy = performedBy,
            LastModifiedBy = performedBy
        };

        //order.AddDomainEvent(new OrderCreatedEvent(order));

        return order;
    }

    #endregion

    #region Methods

    public void UpdateShippingAddress(Address shippingAddress, string performBy)
    {
        ShippingAddress = shippingAddress;
        LastModifiedBy = performBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
        //AddDomainEvent(new OrderUpdatedEvent(this));
    }

    public void UpdateCustomerInfo(Customer customer, string performBy)
    {
        Customer = customer;
        LastModifiedBy = performBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
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

    public void ApplyDiscount(Discount discount)
    {
        Discount = discount;
    }

    public void UpdateStatus(OrderStatus status, string performBy)
    {
        if (!Enum.IsDefined(typeof(OrderStatus), status))
        {
            throw new ArgumentException(MessageCode.InvalidOrderStatus, nameof(status));
        }

        Status = status;
        LastModifiedBy = performBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
    }

    public void CancelOrder(string reason, string performBy)
    {
        UpdateStatus(OrderStatus.Canceled, performBy);

        CancelReason = reason;
        LastModifiedBy = performBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;

        AddDomainEvent(new OrderCancelledDomainEvent(this));
    }

    public void RefundOrder(string reason, string performBy)
    {
        UpdateStatus(OrderStatus.Refunded, performBy);

        RefundReason = reason;
        LastModifiedBy = performBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;

        AddDomainEvent(new OrderCancelledDomainEvent(this));
    }

    public void OrderCreated()
    {
        AddDomainEvent(new OrderCreatedDomainEvent(this));
    }

    public void OrderDelivered(string performBy)
    {
        UpdateStatus(OrderStatus.Delivered, performBy!);
        AddDomainEvent(new OrderDeliveredDomainEvent(this));
    }

    #endregion
}