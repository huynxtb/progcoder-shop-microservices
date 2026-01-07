#region using

using BuildingBlocks.Abstractions;
using Inventory.Domain.Entities;

#endregion

namespace Inventory.Domain.Repositories;

public interface IInboxMessageRepository : IBaseRepository<InboxMessageEntity>
{
    #region Methods

    Task<InboxMessageEntity?> GetByMessageIdAsync(Guid messageId, CancellationToken cancellationToken = default);

    #endregion
}
