#region using

using Notification.Domain.Abstractions;
using Notification.Domain.Enums;

#endregion

namespace Notification.Domain.Entities;

public sealed class NotificationTemplate : Entity<Guid>
{
    #region Fields, Properties and Indexers

    public string? Key { get; set; }

    public ChannelType Channel { get; set; }

    public string? Subject { get; set; }

    public string? Body { get; set; }

    #endregion

    #region Ctors

    private NotificationTemplate() { }

    #endregion

    #region Methods

    public static NotificationTemplate Create(
        Guid id,
        string key,
        ChannelType channel,
        string subject,
        string body,
        string modifiedBy)
    {
        return new NotificationTemplate()
        {
            Id = id,
            Key = key,
            Channel = channel,
            Subject = subject,
            Body = body,
            CreatedBy = modifiedBy,
            LastModifiedBy = modifiedBy,
            CreatedOnUtc = DateTimeOffset.UtcNow,
            LastModifiedOnUtc = DateTimeOffset.UtcNow
        };
    }

    #endregion
}
