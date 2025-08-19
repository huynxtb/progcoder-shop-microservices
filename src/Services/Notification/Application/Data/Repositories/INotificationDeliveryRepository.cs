#region using

using Notification.Domain.Entities;

#endregion

namespace Notification.Application.Data.Repositories;

public interface INotificationDeliveryRepository
{
    #region Methods

    Task InsertManyAsync(IEnumerable<NotificationDelivery> docs, CancellationToken cancellationToken = default);

    Task<IReadOnlyList<NotificationDelivery>> GetDueAsync(DateTimeOffset now, int batchSize, CancellationToken ctcancellationToken = default);

    Task UpsertAsync(NotificationDelivery doc, CancellationToken cancellationToken = default);

    Task<NotificationDelivery> GetByEventIdAsync(string eventId, CancellationToken cancellationToken = default);

    #endregion
}
