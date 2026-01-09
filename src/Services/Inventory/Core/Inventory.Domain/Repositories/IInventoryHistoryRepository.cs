#region using

using Inventory.Domain.Entities;

#endregion

namespace Inventory.Domain.Repositories;

public interface IInventoryHistoryRepository : IRepository<InventoryHistoryEntity>
{
}
