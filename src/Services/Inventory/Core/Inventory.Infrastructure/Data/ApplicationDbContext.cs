#region using

using Microsoft.EntityFrameworkCore;
using Inventory.Application.Data;
using System.Reflection;
using Inventory.Domain.Entities;

#endregion

namespace Inventory.Infrastructure.Data;

public sealed class ApplicationDbContext : DbContext, IApplicationDbContext
{
    #region Ctors

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    #endregion

    #region Implementations

    public DbSet<InventoryItemEntity> InventoryItems => Set<InventoryItemEntity>();

    public DbSet<InventoryReservationEntity> InventoryReservations => Set<InventoryReservationEntity>();

    public DbSet<InventoryHistoryEntity> InventoryHistories => Set<InventoryHistoryEntity>();

    public DbSet<OutboxMessageEntity> OutboxMessages => Set<OutboxMessageEntity>();

    #endregion

    #region Override Methods

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        base.OnModelCreating(builder);
    }

    #endregion

}
