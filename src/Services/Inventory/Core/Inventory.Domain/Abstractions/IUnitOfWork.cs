#region using

using Inventory.Domain.Repositories;

#endregion

namespace Inventory.Domain.Abstractions;

public interface IUnitOfWork
{
    #region Fields, Properties and Indexers

    IInventoryReservationRepository InventoryReservations { get; }

    IInventoryItemRepository InventoryItems { get; }

    IInventoryHistoryRepository InventoryHistories { get; }

    ILocationRepository Locations { get; }

    IInboxMessageRepository InboxMessages { get; }

    IOutboxMessageRepository OutboxMessages { get; }

    #endregion

    #region Methods

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);

    Task<IDbTransaction> BeginTransactionAsync(CancellationToken cancellationToken = default);

    #endregion
}