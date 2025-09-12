#region using

using Order.Application.Dtos.Abstractions;
using Order.Application.Dtos.ValueObjects;
using Order.Domain.Enums;

#endregion

namespace Order.Application.Dtos.Orders;

public class OrderDto : EntityDto<Guid>
{
    #region Fields, Properties and Indexers

    public OrderNoDto OrderNo { get; set; } = default!;

    public CustomerDto Customer { get; set; } = default!;

    public AddressDto ShippingAddress { get; set; } = default!;

    public List<OrderItemDto> OrderItems { get; set; } = new();

    public decimal TotalPrice { get; set; }

    public OrderStatus Status { get; set; } = default!;

    #endregion
}
