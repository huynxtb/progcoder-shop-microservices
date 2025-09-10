#region using

using Order.Application.Dtos.Abstractions;

#endregion

namespace Order.Application.Dtos.Orders;

public class ProductDto : DtoId<Guid>
{
    #region Fields, Properties and Indexers

    public string Name { get; set; } = default!;

    public string ImageUrl { get; set; } = default!;

    public decimal Price { get; set; } = default!;

    #endregion
}
