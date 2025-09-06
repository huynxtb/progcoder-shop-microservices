#region using

using Microsoft.EntityFrameworkCore;
using Order.Application.Data;
using System.Reflection;
using Order.Domain.Entities;

#endregion

namespace Order.Infrastructure.Data;

public sealed class ApplicationDbContext : DbContext, IApplicationDbContext
{
    #region Ctors

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    #endregion

    #region Implementations

    public DbSet<InventoryItemEntity> InventoryItems => Set<InventoryItemEntity>();

    public DbSet<InventoryReservationEntity> InventoryReservations => Set<InventoryReservationEntity>();

    public DbSet<OutboxMessageEntity> OutboxMessages => Set<OutboxMessageEntity>();

    public DbSet<InventoryHistoryEntity> InventoryHistories => Set<InventoryHistoryEntity>();

    #endregion

    #region Override Methods

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        base.OnModelCreating(builder);
    }

    #endregion

}
