#region using

using Order.Domain.Entities;
using Order.Domain.Repositories;
using Order.Infrastructure.Data;

#endregion

namespace Order.Infrastructure.Repositories;

public class OutboxMessageRepository(ApplicationDbContext context) : Repository<OutboxMessageEntity>(context), IOutboxMessageRepository
{
}
