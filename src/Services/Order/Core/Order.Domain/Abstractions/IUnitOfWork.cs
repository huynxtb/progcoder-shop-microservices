#region using

using Order.Domain.Repositories;

#endregion

namespace Order.Domain.Abstractions;

public interface IUnitOfWork
{
    #region Fields, Properties and Indexers

    IOrderRepository Orders { get; }

    IOrderItemRepository OrderItems { get; }

    IInboxMessageRepository InboxMessages { get; }

    IOutboxMessageRepository OutboxMessages { get; }

    #endregion

    #region Methods

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);

    Task<IDbTransaction> BeginTransactionAsync(CancellationToken cancellationToken = default);

    #endregion
}
