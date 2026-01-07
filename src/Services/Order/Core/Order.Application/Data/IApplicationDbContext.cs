#region using

using Microsoft.EntityFrameworkCore;
using Order.Domain.Entities;

#endregion

namespace Order.Application.Data;

public interface IApplicationDbContext
{
    #region Fields, Properties and Indexers

    DbSet<OrderEntity> Orders { get; }

    DbSet<OrderItemEntity> OrderItems { get; }

    DbSet<OutboxMessageEntity> OutboxMessages { get; }

    DbSet<InboxMessageEntity> InboxMessages { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);

    #endregion
}
