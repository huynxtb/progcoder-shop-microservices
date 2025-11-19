#region using

using Discount.Application.Repositories;
using MongoDB.Driver;

#endregion

namespace Discount.Infrastructure.Repositories;

/// <summary>
/// Unit of Work implementation for MongoDB with transaction support.
/// </summary>
public sealed class UnitOfWork : IUnitOfWork, IMongoSessionProvider
{
    #region Fields, Properties and Indexers

    private readonly IMongoClient _mongoClient;
    private readonly IMongoDatabase _database;
    private IClientSessionHandle? _session;
    private bool _disposed;

    /// <summary>
    /// Gets the coupon repository.
    /// </summary>
    public ICouponRepository Coupons { get; }

    #endregion

    #region Ctors

    public UnitOfWork(
        IMongoClient mongoClient, 
        IMongoDatabase database, 
        ICouponRepository couponRepository)
    {
        _mongoClient = mongoClient ?? throw new ArgumentNullException(nameof(mongoClient));
        _database = database ?? throw new ArgumentNullException(nameof(database));
        Coupons = couponRepository ?? throw new ArgumentNullException(nameof(couponRepository));
    }

    #endregion

    #region Methods

    /// <summary>
    /// Begins a new transaction.
    /// Note: MongoDB transactions require a replica set or sharded cluster.
    /// </summary>
    public async Task BeginTransactionAsync(CancellationToken cancellationToken = default)
    {
        if (_session != null)
            throw new InvalidOperationException("A transaction is already in progress.");

        _session = await _mongoClient.StartSessionAsync(cancellationToken: cancellationToken);
        _session.StartTransaction();
    }

    /// <summary>
    /// Commits the current transaction.
    /// </summary>
    public async Task CommitTransactionAsync(CancellationToken cancellationToken = default)
    {
        if (_session == null)
            throw new InvalidOperationException("No active transaction to commit.");

        if (!_session.IsInTransaction)
            throw new InvalidOperationException("Session is not in a transaction.");

        await _session.CommitTransactionAsync(cancellationToken);
        await DisposeSessionAsync();
    }

    /// <summary>
    /// Rolls back the current transaction.
    /// </summary>
    public async Task RollbackTransactionAsync(CancellationToken cancellationToken = default)
    {
        if (_session == null)
            throw new InvalidOperationException("No active transaction to rollback.");

        if (_session.IsInTransaction)
        {
            await _session.AbortTransactionAsync(cancellationToken);
        }

        await DisposeSessionAsync();
    }

    /// <summary>
    /// Saves all changes. If a transaction is active, it commits the transaction.
    /// </summary>
    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        if (_session != null && _session.IsInTransaction)
        {
            await CommitTransactionAsync(cancellationToken);
            return 1; // Return 1 to indicate changes were saved
        }

        // If no transaction, changes are already persisted (MongoDB auto-commits)
        return 0;
    }

    /// <summary>
    /// Gets the current MongoDB session if a transaction is active.
    /// </summary>
    IClientSessionHandle? IMongoSessionProvider.GetSession()
    {
        return _session;
    }

    private Task DisposeSessionAsync()
    {
        if (_session != null)
        {
            _session.Dispose();
            _session = null;
        }
        return Task.CompletedTask;
    }

    #endregion

    #region IDisposable

    public void Dispose()
    {
        if (_disposed)
            return;

        if (_session != null)
        {
            if (_session.IsInTransaction)
            {
                // Rollback if transaction is still active
                _session.AbortTransaction();
            }
            _session.Dispose();
            _session = null;
        }

        _disposed = true;
    }

    #endregion

    #region IAsyncDisposable

    public async ValueTask DisposeAsync()
    {
        if (_disposed)
            return;

        if (_session != null)
        {
            if (_session.IsInTransaction)
            {
                // Rollback if transaction is still active
                await _session.AbortTransactionAsync();
            }
            _session.Dispose();
            _session = null;
        }

        _disposed = true;
    }

    #endregion
}

