#region using

using Order.Domain.Entities;

#endregion

namespace Order.Domain.Repositories;

public interface IInboxMessageRepository : IRepository<InboxMessageEntity>
{
    #region Methods

    Task<InboxMessageEntity?> GetByMessageIdAsync(Guid messageId, CancellationToken cancellationToken = default);

    #endregion
}
