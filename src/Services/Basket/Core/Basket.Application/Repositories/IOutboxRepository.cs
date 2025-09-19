#region using

using Basket.Domain.Entities;

#endregion

namespace Basket.Application.Repositories;

public interface IOutboxRepository
{
    #region Methods

    Task<bool> RaiseMessageAsync(OutboxMessageEntity message, CancellationToken cancellationToken = default);

    Task<List<OutboxMessageEntity>> GetMessagesAsync(OutboxMessageEntity message, int batchSize, CancellationToken cancellationToken = default);

    Task<bool> UpdateMessagesAsync(IEnumerable<OutboxMessageEntity> messages, CancellationToken cancellationToken = default);

    #endregion
}
