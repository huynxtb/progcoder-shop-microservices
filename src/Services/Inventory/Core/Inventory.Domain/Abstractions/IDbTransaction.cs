namespace Inventory.Domain.Abstractions;

public interface IDbTransaction : IDisposable, IAsyncDisposable
{
    #region Methods

    Task CommitAsync(CancellationToken cancellationToken = default);

    Task RollbackAsync(CancellationToken cancellationToken = default);

    #endregion
}
