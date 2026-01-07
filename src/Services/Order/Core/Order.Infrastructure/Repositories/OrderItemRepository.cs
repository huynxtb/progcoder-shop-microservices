#region using

using Order.Domain.Entities;
using Order.Domain.Repositories;
using Order.Infrastructure.Data;

#endregion

namespace Order.Infrastructure.Repositories;

public class OrderItemRepository(ApplicationDbContext context) : Repository<OrderItemEntity>(context), IOrderItemRepository
{
    #region Implementations

    #endregion
}
