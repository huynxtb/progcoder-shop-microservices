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
