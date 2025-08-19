namespace Notification.Application.Models;

public sealed class NotificationContext
{
    #region Fields, Properties and Indexers

    public Guid? UserId { get; init; }

    public IReadOnlySet<string> To { get; init; } = new HashSet<string>();

    public IReadOnlySet<string> Cc { get; init; } = new HashSet<string>();

    public IReadOnlySet<string> Bcc { get; init; } = new HashSet<string>();

    public string? Subject { get; init; }

    public string? Body { get; init; }

    public bool IsHtml { get; init; }

    public IReadOnlyDictionary<string, object> Data { get; init; } = new Dictionary<string, object>();

    #endregion

}