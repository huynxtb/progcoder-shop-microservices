#region using

using System.Data;

#endregion

namespace Inventory.Domain.Abstractions;

public interface IDbTransaction : IDisposable, IAsyncDisposable
{
    Task CommitAsync(CancellationToken cancellationToken = default);
    
    Task RollbackAsync(CancellationToken cancellationToken = default);
}
