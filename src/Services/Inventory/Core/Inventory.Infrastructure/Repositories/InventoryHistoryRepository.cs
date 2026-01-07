#region using

using Inventory.Domain.Entities;
using Inventory.Domain.Repositories;
using Inventory.Infrastructure.Data;

#endregion

namespace Inventory.Infrastructure.Repositories;

public class InventoryHistoryRepository : Repository<InventoryHistoryEntity>, IInventoryHistoryRepository
{
    #region Ctors

    public InventoryHistoryRepository(ApplicationDbContext context) : base(context)
    {
    }

    #endregion
}
