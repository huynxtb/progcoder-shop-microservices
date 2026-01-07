#region using

using BuildingBlocks.Abstractions;
using Order.Domain.Repositories;

#endregion

namespace Order.Domain.Abstractions;

public interface IUnitOfWork : IBaseUnitOfWork
{
    #region Fields, Properties and Indexers

    IOrderRepository Orders { get; }

    IOrderItemRepository OrderItems { get; }

    IInboxMessageRepository InboxMessages { get; }

    IOutboxMessageRepository OutboxMessages { get; }

    #endregion
}
