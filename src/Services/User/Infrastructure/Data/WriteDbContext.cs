#region using

using Microsoft.EntityFrameworkCore;
using Application.Data;
using System.Reflection;
using Domain.Entities;

#endregion

namespace Infrastructure.Data;

public class WriteDbContext : DbContext, IWriteDbContext
{
    #region Ctors

    public WriteDbContext(DbContextOptions<WriteDbContext> options)
        : base(options) { }

    #endregion

    #region Implementations

    public DbSet<Agent> Agents => Set<Agent>();

    public DbSet<KeycloakUser> KeycloakUsers => Set<KeycloakUser>();

    public DbSet<AccountProfile> AccountProfiles => Set<AccountProfile>();

    public DbSet<Subscription> Subscriptions => Set<Subscription>();

    public DbSet<AccountSubscription> AccountSubscriptions => Set<AccountSubscription>();

    public DbSet<ChatThread> ChatThreads => Set<ChatThread>();

    public DbSet<ChatHistory> ChatHistories => Set<ChatHistory>();

    public DbSet<Coupon> Coupons => Set<Coupon>();

    #endregion

    #region Methods

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        base.OnModelCreating(builder);
    }

    #endregion

}
