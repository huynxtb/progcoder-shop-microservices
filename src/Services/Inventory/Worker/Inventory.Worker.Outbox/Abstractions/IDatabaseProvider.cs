#region using

using Inventory.Domain.Entities;
using Inventory.Worker.Outbox.Structs;

#endregion

namespace Inventory.Worker.Outbox.Abstractions;

public interface IDatabaseProvider
{
    #region Methods

    Task ReleaseExpiredClaimsAsync(string connectionString, TimeSpan claimTimeout, CancellationToken cancellationToken = default);

    Task<List<OutboxMessageEntity>> ClaimAndRetrieveMessagesBatchAsync(string connectionString, int batchSize, TimeSpan claimTimeout, CancellationToken cancellationToken = default);

    Task<List<OutboxMessageEntity>> ClaimAndRetrieveRetryMessagesAsync(string connectionString, int batchSize, CancellationToken cancellationToken = default);

    Task ReleaseClaimsAsync(string connectionString, IEnumerable<Guid> messageIds, CancellationToken cancellationToken = default);

    Task UpdateProcessedMessagesAsync(string connectionString, IEnumerable<OutboxUpdate> updates, CancellationToken cancellationToken = default);

    #endregion
}
