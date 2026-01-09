#region using

using Microsoft.EntityFrameworkCore.Storage;
using Inventory.Domain.Abstractions;

#endregion

namespace Inventory.Infrastructure.UnitOfWork;

internal class DbTransactionAdapter(IDbContextTransaction transaction) : IDbTransaction
{
    #region Implementations


    public async Task CommitAsync(CancellationToken cancellationToken = default)
    {
        await transaction.CommitAsync(cancellationToken);
    }


    public async Task RollbackAsync(CancellationToken cancellationToken = default)
    {
        await transaction.RollbackAsync(cancellationToken);
    }


    public void Dispose()
    {
        transaction.Dispose();
    }


    public async ValueTask DisposeAsync()
    {
        await transaction.DisposeAsync();
    }

    #endregion
}
