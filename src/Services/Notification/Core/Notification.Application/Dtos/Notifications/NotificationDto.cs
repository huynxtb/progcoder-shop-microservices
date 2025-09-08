#region using

using Notification.Application.Dtos.Abstractions;

#endregion

namespace Notification.Application.Dtos.Notifications;

public class NotificationDto : DtoId<Guid>
{
    #region Fields, Properties and Indexers

    public string? Title { get; set; }

    public string? Message { get; set; }

    public bool IsRead { get; set; }

    public DateTimeOffset? ReadAt { get; set; }

    #endregion
}
