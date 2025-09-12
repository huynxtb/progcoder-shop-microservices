namespace Order.Application.Dtos.Orders;

public class CreateOrUpdateOrderDto
{
    #region Fields, Properties and Indexers

    public CustomerDto Customer { get; set; } = default!;

    public AddressDto ShippingAddress { get; set; } = default!;

    public List<CreateOrderItemDto> OrderItems { get; set; } = [];

    #endregion
}
