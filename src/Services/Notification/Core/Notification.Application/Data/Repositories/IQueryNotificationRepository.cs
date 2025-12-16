#region using

using Notification.Domain.Entities;

#endregion

namespace Notification.Application.Data.Repositories;

public interface IQueryNotificationRepository
{
    #region Methods

    Task<List<NotificationEntity>> GetNotificationsAsync(Guid userId, CancellationToken cancellationToken = default);

    Task<NotificationEntity> GetNotificationByIdAsync(Guid id, Guid userId, CancellationToken cancellationToken = default);

    Task<List<NotificationEntity>> GetAllNotificationsAsync(Guid userId, CancellationToken cancellationToken = default);

    Task<long> GetCountNotificationUnreadAsync(Guid userId, CancellationToken cancellationToken = default);

    Task<List<NotificationEntity>> GetTop10NotificationsUnreadAsync(Guid userId, CancellationToken cancellationToken = default);

    #endregion
}
