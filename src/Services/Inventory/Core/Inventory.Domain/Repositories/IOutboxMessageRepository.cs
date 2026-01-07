#region using

#endregion

using BuildingBlocks.Abstractions;

namespace Inventory.Domain.Repositories;

public interface IOutboxMessageRepository : IBaseRepository<Inventory.Domain.Entities.OutboxMessageEntity>
{
    #region Methods

    #endregion
}
