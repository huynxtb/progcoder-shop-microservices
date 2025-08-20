#region using

using Notification.Domain.Entities;

#endregion

namespace Notification.Application.Data.Repositories;

public interface ICommandNotificationDeliveryRepository
{
    #region Methods

    Task InsertManyAsync(IEnumerable<NotificationDelivery> docs, CancellationToken cancellationToken = default);

    Task UpsertAsync(NotificationDelivery doc, CancellationToken cancellationToken = default);

    #endregion
}
