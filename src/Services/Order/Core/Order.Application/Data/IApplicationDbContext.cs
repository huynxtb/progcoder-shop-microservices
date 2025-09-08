#region using

using Microsoft.EntityFrameworkCore;
using Order.Domain.Entities;

#endregion

namespace Order.Application.Data;

public interface IApplicationDbContext
{
    #region Fields, Properties and Indexers

    

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);

    #endregion
}
