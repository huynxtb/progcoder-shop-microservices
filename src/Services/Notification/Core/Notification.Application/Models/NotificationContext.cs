namespace Notification.Application.Models;

public sealed class NotificationContext
{
    #region Fields, Properties and Indexers

    public Guid? UserId { get; init; }

    public IReadOnlyCollection<string> To { get; init; } = [];

    public IReadOnlyCollection<string> Cc { get; init; } = [];

    public IReadOnlyCollection<string> Bcc { get; init; } = [];

    public string? Subject { get; init; }

    public string? Body { get; init; }

    public bool IsHtml { get; init; }

    public IReadOnlyDictionary<string, object> Data { get; init; } = new Dictionary<string, object>();

    public string? TargetUrl { get; set; }

    #endregion

}