#region using

using Notification.Application.Dtos.Notifications;

#endregion

namespace Notification.Application.Models.Results;

public sealed class GetAllNotificationsResult
{
    #region Fields, Properties and Indexers

    public List<NotificationDto>? Notifications { get; set; }

    #endregion

    #region Ctors

    public GetAllNotificationsResult(List<NotificationDto> items)
    {
        Notifications = items;
    }

    #endregion
}

