#region using

using Notification.Application.Models;
using Notification.Domain.Enums;

#endregion

namespace Notification.Application.Services;

public interface INotificationChannel
{
    #region Fields, Properties and Indexers
    
    ChannelType Channel { get; }

    #endregion

    #region Methods

    Task<ChannelResult> SendAsync(NotificationContext context, CancellationToken cancellationToken);

    #endregion
}
