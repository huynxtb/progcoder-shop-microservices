#region using

using Notification.Application.Dtos.Notifications;

#endregion

namespace Notification.Application.Models.Responses;

public sealed class GetNotificationsReponse
{
    #region Fields, Properties and Indexers

    public List<NotificationDto>? Items { get; set; }

    #endregion
}
