#region using

using Notification.Domain.Entities;

#endregion

namespace Notification.Application.Data.Repositories;

public interface IQueryNotificationDeliveryRepository
{
    #region Methods

    Task<IReadOnlyList<NotificationDelivery>> GetDueAsync(DateTimeOffset now, int batchSize, CancellationToken ctcancellationToken = default);

    Task<NotificationDelivery> GetByEventIdAsync(string eventId, CancellationToken cancellationToken = default);

    #endregion
}
