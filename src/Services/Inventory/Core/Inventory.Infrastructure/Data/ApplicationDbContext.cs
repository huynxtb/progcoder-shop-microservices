#region using

using Microsoft.EntityFrameworkCore;
using System.Reflection;
using Inventory.Domain.Entities;

#endregion

namespace Inventory.Infrastructure.Data;

public sealed class ApplicationDbContext : DbContext
{
    #region Ctors

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    #endregion

    #region Implementations

    public DbSet<InventoryItemEntity> InventoryItems => Set<InventoryItemEntity>();

    public DbSet<InventoryReservationEntity> InventoryReservations => Set<InventoryReservationEntity>();

    public DbSet<InventoryHistoryEntity> InventoryHistories => Set<InventoryHistoryEntity>();

    public DbSet<LocationEntity> Locations => Set<LocationEntity>();

    public DbSet<OutboxMessageEntity> OutboxMessages => Set<OutboxMessageEntity>();

    public DbSet<InboxMessageEntity> InboxMessages => Set<InboxMessageEntity>();


    #endregion

    #region Override Methods

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        base.OnModelCreating(builder);
    }

    #endregion

}
