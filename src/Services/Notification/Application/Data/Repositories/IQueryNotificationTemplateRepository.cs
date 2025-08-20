#region using

using Notification.Domain.Entities;
using Notification.Domain.Enums;

#endregion

namespace Notification.Application.Data.Repositories;

public interface IQueryNotificationTemplateRepository
{
    #region Methods

    Task<NotificationTemplate> GetAsync(string key, ChannelType channel, CancellationToken cancellationToken = default);

    #endregion
}
