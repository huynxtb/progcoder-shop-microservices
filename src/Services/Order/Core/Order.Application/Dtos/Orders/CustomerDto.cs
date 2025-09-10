#region using

using Order.Application.Dtos.Abstractions;

#endregion

namespace Order.Application.Dtos.Orders;

public class CustomerDto : DtoId<Guid>
{
    #region Fields, Properties and Indexers

    public string PhoneNumber { get; set; } = default!;

    public string Name { get; set; } = default!;

    public string Email { get; set; } = default!;

    #endregion
}
