#region using

using Microsoft.EntityFrameworkCore;
using Domain.Entities;

#endregion

namespace Application.Data;

public interface IReadDbContext
{
    #region Fields, Properties and Indexers

    DbSet<User> Users { get; }

    DbSet<Role> Roles { get; }

    DbSet<UserRole> UserRoles { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);

    #endregion
}
