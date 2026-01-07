#region using

using Notification.Domain.Abstractions;
using Notification.Domain.Enums;

#endregion

namespace Notification.Domain.Entities;

public sealed class TemplateEntity : Entity<Guid>
{
    #region Fields, Properties and Indexers

    public string? Key { get; set; }

    public ChannelType Channel { get; set; }

    public string? Subject { get; set; }

    public string? Body { get; set; }

    public bool IsHtml { get; set; }

    #endregion

    #region Methods

    public static TemplateEntity Create(
        Guid id,
        string key,
        ChannelType channel,
        string subject,
        bool isHtml,
        string body,
        string performedBy)
    {
        return new TemplateEntity()
        {
            Id = id,
            Key = key,
            Channel = channel,
            Subject = subject,
            Body = body,
            IsHtml = isHtml,
            CreatedBy = performedBy,
            LastModifiedBy = performedBy,
            CreatedOnUtc = DateTimeOffset.UtcNow,
            LastModifiedOnUtc = DateTimeOffset.UtcNow
        };
    }

    #endregion
}
