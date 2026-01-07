namespace BuildingBlocks.Abstractions;

public interface IBaseUnitOfWork : IDisposable
{
    #region Methods

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);

    Task<IDbTransaction> BeginTransactionAsync(CancellationToken cancellationToken = default);

    #endregion
}
