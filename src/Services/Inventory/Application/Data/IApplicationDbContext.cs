#region using

using Microsoft.EntityFrameworkCore;
using Inventory.Domain.Entities;

#endregion

namespace Inventory.Application.Data;

public interface IApplicationDbContext
{
    #region Fields, Properties and Indexers

    DbSet<InventoryItemEntity> InventoryItems { get; }

    DbSet<InventoryReservationEntity> InventoryReservations { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);

    #endregion
}
