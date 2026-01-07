#region using

using Inventory.Domain.Entities;
using Inventory.Domain.Repositories;
using Inventory.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Inventory.Infrastructure.Repositories;

public class InboxMessageRepository(ApplicationDbContext context) : Repository<InboxMessageEntity>(context), IInboxMessageRepository
{
    #region Implementations

    public async Task<InboxMessageEntity?> GetByMessageIdAsync(Guid messageId, CancellationToken cancellationToken = default)
    {
        return await _dbSet
            .FirstOrDefaultAsync(m => m.Id == messageId, cancellationToken);
    }

    #endregion
}
