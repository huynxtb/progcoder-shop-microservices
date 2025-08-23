#region using

using Microsoft.EntityFrameworkCore;
using User.Domain.Entities;

#endregion

namespace User.Application.Data;

public interface IApplicationDbContext
{
    #region Fields, Properties and Indexers

    DbSet<UserEntity> Users { get; }

    DbSet<LoginHistoryEntity> LoginHistories { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);

    #endregion
}
