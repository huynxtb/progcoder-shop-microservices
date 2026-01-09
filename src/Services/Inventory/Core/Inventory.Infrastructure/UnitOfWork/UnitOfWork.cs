#region using

using Inventory.Domain.Abstractions;
using Inventory.Domain.Repositories;
using Inventory.Infrastructure.Data;

#endregion

namespace Inventory.Infrastructure.UnitOfWork;

public class UnitOfWork(
    IInventoryReservationRepository inventoryReservations,
    IInventoryItemRepository inventoryItems,
    IInventoryHistoryRepository inventoryHistories,
    ILocationRepository locations,
    IInboxMessageRepository inboxMessages,
    IOutboxMessageRepository outboxMessages,
    ApplicationDbContext context) : IUnitOfWork
{
    public IInventoryReservationRepository InventoryReservations { get; } = inventoryReservations;
    public IInventoryItemRepository InventoryItems { get; } = inventoryItems;
    public IInventoryHistoryRepository InventoryHistories { get; } = inventoryHistories;
    public ILocationRepository Locations { get; } = locations;
    public IInboxMessageRepository InboxMessages { get; } = inboxMessages;
    public IOutboxMessageRepository OutboxMessages { get; } = outboxMessages;

    public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        => context.SaveChangesAsync(cancellationToken);

    public async Task<IDbTransaction> BeginTransactionAsync(CancellationToken cancellationToken = default)
    {
        var tx = await context.Database.BeginTransactionAsync(cancellationToken);
        return new DbTransactionAdapter(tx);
    }
}
