#region using

using Inventory.Domain.Entities;

#endregion

namespace Inventory.Domain.Repositories;

public interface IOutboxMessageRepository : IRepository<OutboxMessageEntity>
{
    #region Methods

    #endregion
}
