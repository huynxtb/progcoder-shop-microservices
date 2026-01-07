#region using

using BuildingBlocks.Abstractions;
using Order.Domain.Entities;

#endregion

namespace Order.Domain.Repositories;

public interface IOutboxMessageRepository : IBaseRepository<OutboxMessageEntity>
{
    #region Methods

    #endregion
}
