#region using

using BuildingBlocks.Abstractions;
using Inventory.Domain.Repositories;

#endregion

namespace Inventory.Domain.Abstractions;

public interface IUnitOfWork : IBaseUnitOfWork
{
    #region Fields, Properties and Indexers

    IInventoryReservationRepository InventoryReservations { get; }

    IInventoryItemRepository InventoryItems { get; }

    IInventoryHistoryRepository InventoryHistories { get; }

    ILocationRepository Locations { get; }

    IInboxMessageRepository InboxMessages { get; }

    IOutboxMessageRepository OutboxMessages { get; }

    #endregion
}
