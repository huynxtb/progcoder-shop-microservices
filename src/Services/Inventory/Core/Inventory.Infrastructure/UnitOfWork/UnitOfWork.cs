#region using

using Inventory.Domain.Abstractions;
using Inventory.Domain.Repositories;
using Inventory.Infrastructure.Data;
using Inventory.Infrastructure.Repositories;

#endregion

namespace Inventory.Infrastructure.UnitOfWork;

public class UnitOfWork(ApplicationDbContext context) : IUnitOfWork
{
    #region Fields

    private IInboxMessageRepository? _inboxMessages;

    private IInventoryReservationRepository? _inventoryReservations;

    private IInventoryItemRepository? _inventoryItems;

    private IInventoryHistoryRepository? _inventoryHistories;

    private ILocationRepository? _locations;
    
    private IOutboxMessageRepository? _outboxMessages;

    #endregion


    #region Implementations

    public IInboxMessageRepository InboxMessages => 
        _inboxMessages ??= new InboxMessageRepository(context);

    public IInventoryReservationRepository InventoryReservations => 
        _inventoryReservations ??= new InventoryReservationRepository(context);

    public IInventoryItemRepository InventoryItems => 
        _inventoryItems ??= new InventoryItemRepository(context);

    public IInventoryHistoryRepository InventoryHistories => 
        _inventoryHistories ??= new InventoryHistoryRepository(context);

    public ILocationRepository Locations => 
        _locations ??= new LocationRepository(context);
    
    public IOutboxMessageRepository OutboxMessages =>
        _outboxMessages ??= new OutboxMessageRepository(context);

    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return await context.SaveChangesAsync(cancellationToken);
    }

    public async Task<IDbTransaction> BeginTransactionAsync(CancellationToken cancellationToken = default)
    {
        var efTransaction = await context.Database.BeginTransactionAsync(cancellationToken);
        return new DbTransactionAdapter(efTransaction);
    }

    public void Dispose()
    {
        context.Dispose();
    }

    #endregion
}
