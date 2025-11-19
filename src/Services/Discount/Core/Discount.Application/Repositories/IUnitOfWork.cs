#region using

#endregion

namespace Discount.Application.Repositories;

/// <summary>
/// Unit of Work pattern interface for managing transactions and ensuring data consistency.
/// </summary>
public interface IUnitOfWork : IDisposable, IAsyncDisposable
{
    #region Properties

    /// <summary>
    /// Gets the coupon repository.
    /// </summary>
    ICouponRepository Coupons { get; }

    #endregion

    #region Methods

    /// <summary>
    /// Begins a new transaction.
    /// </summary>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>Task representing the async operation.</returns>
    Task BeginTransactionAsync(CancellationToken cancellationToken = default);

    /// <summary>
    /// Commits the current transaction.
    /// </summary>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>Task representing the async operation.</returns>
    Task CommitTransactionAsync(CancellationToken cancellationToken = default);

    /// <summary>
    /// Rolls back the current transaction.
    /// </summary>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>Task representing the async operation.</returns>
    Task RollbackTransactionAsync(CancellationToken cancellationToken = default);

    /// <summary>
    /// Saves all changes made in the unit of work.
    /// This will commit the transaction if one is active.
    /// </summary>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>Task representing the async operation.</returns>
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);

    #endregion
}

