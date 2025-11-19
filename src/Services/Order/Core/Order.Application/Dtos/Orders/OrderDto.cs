#region using

using Order.Application.Dtos.Abstractions;
using Order.Application.Dtos.ValueObjects;
using Order.Domain.Enums;

#endregion

namespace Order.Application.Dtos.Orders;

public class OrderDto : EntityDto<Guid>
{
    #region Fields, Properties and Indexers

    public string OrderNo { get; set; } = default!;

    public CustomerDto Customer { get; set; } = default!;

    public AddressDto ShippingAddress { get; set; } = default!;

    public List<OrderItemDto> OrderItems { get; set; } = new();

    public DiscountDto Discount { get; set; } = default!;

    public OrderStatus Status { get; set; } = default!;

    public string DisplayStatus { get; set; } = default!;

    public decimal TotalPrice { get; set; }

    public decimal FinalPrice { get; set; }

    #endregion
}
