#region using

using Microsoft.EntityFrameworkCore;
using Order.Domain.Entities;
using Order.Domain.Repositories;
using Order.Infrastructure.Data;

#endregion

namespace Order.Infrastructure.Repositories;

public class InboxMessageRepository(ApplicationDbContext context) : Repository<InboxMessageEntity>(context), IInboxMessageRepository
{
    #region Implementations

    public async Task<InboxMessageEntity?> GetByMessageIdAsync(Guid messageId, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == messageId, cancellationToken);
    }

    #endregion
}
