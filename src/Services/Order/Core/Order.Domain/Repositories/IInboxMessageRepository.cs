#region using

using BuildingBlocks.Abstractions;
using Order.Domain.Entities;

#endregion

namespace Order.Domain.Repositories;

public interface IInboxMessageRepository : IBaseRepository<InboxMessageEntity>
{
    #region Methods

    Task<InboxMessageEntity?> GetByMessageIdAsync(Guid messageId, CancellationToken cancellationToken = default);

    #endregion
}
