#region using

using Order.Worker.Outbox.Models;
using Order.Worker.Outbox.Structs;

#endregion

namespace Order.Worker.Outbox.Abstractions;

public interface IDatabaseProvider
{
    #region Methods

    Task<List<OutboxMessage>> GetUnprocessedMessagesAsync(string connectionString, int batchSize, CancellationToken cancellationToken = default);

    Task UpdateProcessedMessagesAsync(string connectionString, IEnumerable<OutboxUpdate> updates, CancellationToken cancellationToken = default);

    #endregion
}
