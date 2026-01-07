#region using

using Inventory.Domain.Entities;
using Inventory.Domain.Repositories;
using Inventory.Infrastructure.Data;

#endregion

namespace Inventory.Infrastructure.Repositories;

public class OutboxMessageRepository(ApplicationDbContext context) : Repository<OutboxMessageEntity>(context), IOutboxMessageRepository
{
    #region Implementations

    #endregion
}
