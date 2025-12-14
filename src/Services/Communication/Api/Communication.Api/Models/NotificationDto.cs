#region using

#endregion

namespace Communication.Api.Models;

public sealed class NotificationDto
{
    #region Fields, Properties and Indexers

    public NotificationType Type { get; set; }

    public string Title { get; set; } = default!;

    public string Message { get; set; } = default!;

    public object? Data { get; set; }

    public DateTimeOffset Timestamp { get; set; }

    public string? UserId { get; set; }

    #endregion
}
