#region using

using Microsoft.EntityFrameworkCore;
using Order.Domain.Entities;

#endregion

namespace Order.Application.Data;

public interface IApplicationDbContext
{
    #region Fields, Properties and Indexers

    DbSet<InventoryItemEntity> InventoryItems { get; }

    DbSet<InventoryReservationEntity> InventoryReservations { get; }

    DbSet<OutboxMessageEntity> OutboxMessages { get; }

    DbSet<InventoryHistoryEntity> InventoryHistories { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);

    #endregion
}
