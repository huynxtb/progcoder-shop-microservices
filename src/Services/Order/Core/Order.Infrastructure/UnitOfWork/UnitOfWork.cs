#region using

using Order.Domain.Abstractions;
using Order.Domain.Repositories;
using Order.Infrastructure.Data;

#endregion

namespace Order.Infrastructure.UnitOfWork;

public class UnitOfWork(
    IOrderRepository orders,
    IOrderItemRepository orderItems,
    IInboxMessageRepository inbox,
    IOutboxMessageRepository outbox,
    ApplicationDbContext context) : IUnitOfWork
{
    public IOrderRepository Orders { get; } = orders;
    public IOrderItemRepository OrderItems { get; } = orderItems;
    public IInboxMessageRepository InboxMessages { get; } = inbox;
    public IOutboxMessageRepository OutboxMessages { get; } = outbox;

    public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        => context.SaveChangesAsync(cancellationToken);

    public async Task<IDbTransaction> BeginTransactionAsync(CancellationToken cancellationToken = default)
    {
        var tx = await context.Database.BeginTransactionAsync(cancellationToken);
        return new DbTransactionAdapter(tx);
    }
}
