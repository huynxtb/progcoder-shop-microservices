#region using

using Notification.Domain.Entities;

#endregion

namespace Notification.Application.Data.Repositories;

public interface IQueryDeliveryRepository
{
    #region Methods

    Task<IReadOnlyList<DeliveryEntity>> GetDueAsync(DateTimeOffset now, int batchSize, CancellationToken cancellationToken = default);

    Task<DeliveryEntity> GetByEventIdAsync(string eventId, CancellationToken cancellationToken = default);

    #endregion
}
