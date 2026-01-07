#region using

using Inventory.Domain.Entities;

#endregion

namespace Inventory.Domain.Repositories;

public interface IInboxMessageRepository : IRepository<InboxMessageEntity>
{
    #region Methods

    Task<InboxMessageEntity?> GetByMessageIdAsync(Guid messageId, CancellationToken cancellationToken = default);

    #endregion
}
