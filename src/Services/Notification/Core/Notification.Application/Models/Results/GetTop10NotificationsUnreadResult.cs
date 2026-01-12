#region using

using Notification.Application.Dtos.Notifications;

#endregion

namespace Notification.Application.Models.Results;

public sealed class GetTop10NotificationsUnreadResult
{
    #region Fields, Properties and Indexers

    public List<NotificationDto>? Notifications { get; set; }

    #endregion

    #region Ctors

    public GetTop10NotificationsUnreadResult(List<NotificationDto> items)
    {
        Notifications = items;
    }

    #endregion
}

