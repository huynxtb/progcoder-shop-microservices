#region using

using Inventory.Domain.Entities;
using Inventory.Domain.Repositories;
using Inventory.Infrastructure.Data;

#endregion

namespace Inventory.Infrastructure.Repositories;

public class InventoryHistoryRepository(ApplicationDbContext context) : Repository<InventoryHistoryEntity>(context), IInventoryHistoryRepository
{
}
