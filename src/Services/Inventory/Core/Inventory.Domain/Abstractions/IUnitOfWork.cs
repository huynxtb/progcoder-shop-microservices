using Inventory.Domain.Repositories;

namespace Inventory.Domain.Abstractions;

public interface IUnitOfWork : IDisposable
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
