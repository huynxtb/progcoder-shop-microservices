#region using


#region using

using Notification.Application.Dtos.Notifications;

#endregion

namespace Notification.Application.Models.Results;

public sealed class GetNotificationsResult
{
    #region Fields, Properties and Indexers

    public List<NotificationDto>? Notifications { get; set; }

    #endregion

    #region Ctors

    public GetNotificationsResult(List<NotificationDto> items)
    {
        Notifications = items;
    }

    #endregion
}
