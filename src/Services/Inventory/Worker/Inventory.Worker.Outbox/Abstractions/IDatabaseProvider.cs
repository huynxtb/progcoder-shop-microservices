#region using

using Inventory.Worker.Outbox.Models;
using Inventory.Worker.Outbox.Structs;

#endregion

namespace Inventory.Worker.Outbox.Abstractions;

public interface IDatabaseProvider
{
    #region Methods

    Task<List<OutboxMessage>> GetUnprocessedMessagesAsync(string connectionString, int batchSize, CancellationToken cancellationToken = default);

    Task UpdateProcessedMessagesAsync(string connectionString, IEnumerable<OutboxUpdate> updates, CancellationToken cancellationToken = default);

    #endregion
}
