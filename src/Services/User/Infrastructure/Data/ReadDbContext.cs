#region using

using Microsoft.EntityFrameworkCore;
using Application.Data;
using System.Reflection;
using Domain.Entities;

#endregion

namespace Infrastructure.Data;

public sealed class ReadDbContext : DbContext, IReadDbContext
{
    #region Ctors

    public ReadDbContext(DbContextOptions<ReadDbContext> options)
        : base(options) 
    {
        ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
    }

    #endregion

    #region Implementations

    public DbSet<User> Users => Set<User>();

    public DbSet<Role> Roles => Set<Role>();

    public DbSet<UserRole> UserRoles => Set<UserRole>();

    #endregion

    #region Methods

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        base.OnModelCreating(builder);
    }

    #endregion

}
