#region using

using Microsoft.EntityFrameworkCore;
using User.Application.Data;
using System.Reflection;
using User.Domain.Entities;

#endregion

namespace User.Infrastructure.Data;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    #region Ctors

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    #endregion

    #region Implementations

    public DbSet<Domain.Entities.User> Users => Set<Domain.Entities.User>();

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
