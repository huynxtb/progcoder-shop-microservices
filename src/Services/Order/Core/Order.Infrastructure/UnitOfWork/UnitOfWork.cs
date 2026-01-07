#region using

using BuildingBlocks.Abstractions;
using Order.Domain.Abstractions;
using Order.Domain.Repositories;
using Order.Infrastructure.Data;
using Order.Infrastructure.Repositories;

#endregion

namespace Order.Infrastructure.UnitOfWork;

public class UnitOfWork(ApplicationDbContext context) : IUnitOfWork
{
    #region Fields

    private IOrderRepository? _orders;

    private IOrderItemRepository? _orderItems;

    private IInboxMessageRepository? _inboxMessages;

    private IOutboxMessageRepository? _outboxMessages;

    #endregion

    #region Implementations

    public IOrderRepository Orders =>
        _orders ??= new OrderRepository(context);

    public IOrderItemRepository OrderItems =>
        _orderItems ??= new OrderItemRepository(context);

    public IInboxMessageRepository InboxMessages =>
        _inboxMessages ??= new InboxMessageRepository(context);

    public IOutboxMessageRepository OutboxMessages =>
        _outboxMessages ??= new OutboxMessageRepository(context);

    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return await context.SaveChangesAsync(cancellationToken);
    }

    public async Task<IDbTransaction> BeginTransactionAsync(CancellationToken cancellationToken = default)
    {
        var efTransaction = await context.Database.BeginTransactionAsync(cancellationToken);
        return new DbTransactionAdapter(efTransaction);
    }

    public void Dispose()
    {
        context.Dispose();
    }

    #endregion
}
