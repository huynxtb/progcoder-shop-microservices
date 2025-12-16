namespace Notification.Application.Dtos.Notifications;

public sealed class MarkAsReadNotificationDto
{
    #region Fields, Properties and Indexers

    public List<Guid> Ids { get; set; } = default!;

    #endregion
}
