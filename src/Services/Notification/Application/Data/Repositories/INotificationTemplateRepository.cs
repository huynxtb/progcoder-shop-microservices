#region using

using Notification.Domain.Entities;
using Notification.Domain.Enums;

#endregion

namespace Notification.Application.Data.Repositories;

public interface INotificationTemplateRepository
{
    #region Methods

    Task<NotificationTemplate> GetAsync(string key, ChannelType channel, CancellationToken cancellationToken = default);

    Task InsertManyAsync(IEnumerable<NotificationTemplate> docs, CancellationToken cancellationToken = default);

    #endregion
}
