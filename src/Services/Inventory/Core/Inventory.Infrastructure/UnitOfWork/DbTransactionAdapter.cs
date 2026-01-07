#region using

using Inventory.Domain.Abstractions;
using Microsoft.EntityFrameworkCore.Storage;

#endregion

namespace Inventory.Infrastructure.UnitOfWork;

internal class DbTransactionAdapter : IDbTransaction
{
    private readonly IDbContextTransaction _transaction;

    public DbTransactionAdapter(IDbContextTransaction transaction)
    {
        _transaction = transaction;
    }

    public async Task CommitAsync(CancellationToken cancellationToken = default)
    {
        await _transaction.CommitAsync(cancellationToken);
    }

    public async Task RollbackAsync(CancellationToken cancellationToken = default)
    {
        await _transaction.RollbackAsync(cancellationToken);
    }

    public void Dispose()
    {
        _transaction.Dispose();
    }

    public async ValueTask DisposeAsync()
    {
        await _transaction.DisposeAsync();
    }
}
