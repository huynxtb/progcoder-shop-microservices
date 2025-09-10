#region using

using Order.Application.Dtos.Abstractions;

#endregion

namespace Order.Application.Dtos.Orders;

public sealed class CreateOrderItemDto : DtoId<Guid>
{
    #region Fields, Properties and Indexers

    public Guid ProductId { get; set; }

    public int Quantity { get; set; }

    #endregion
}
