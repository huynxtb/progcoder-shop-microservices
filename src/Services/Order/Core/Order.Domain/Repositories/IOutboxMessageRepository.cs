#region using

using Order.Domain.Entities;

#endregion

namespace Order.Domain.Repositories;

public interface IOutboxMessageRepository : IRepository<OutboxMessageEntity>
{
    #region Methods

    #endregion
}
