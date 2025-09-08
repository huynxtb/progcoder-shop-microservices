#region using

using Notification.Domain.Entities;

#endregion

namespace Notification.Application.Data.Repositories;

public interface ICommandNotificationRepository
{
    #region Methods

    Task UpsertAsync(NotificationEntity doc, CancellationToken cancellationToken = default);

    #endregion
}
