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

    public DbSet<LoginHistory> LoginHistories => Set<LoginHistory>();

    #endregion

    #region Override Methods

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        base.OnModelCreating(builder);
    }

    #endregion

}
