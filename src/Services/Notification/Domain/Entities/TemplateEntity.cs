#region using

using Notification.Domain.Abstractions;
using Notification.Domain.Enums;

#endregion

namespace Notification.Domain.Entities;

public sealed class TemplateEntity : Entity<Guid>
{
    #region Fields, Properties and Indexers

    public string? Key { get; private set; }

    public ChannelType Channel { get; private set; }

    public string? Subject { get; private set; }

    public string? Body { get; private set; }

    public bool IsHtml { get; private set; }

    #endregion

    #region Ctors

    private TemplateEntity() { }

    #endregion

    #region Methods

    public static TemplateEntity Create(
        Guid id,
        string key,
        ChannelType channel,
        string subject,
        bool isHtml,
        string body,
        string createdBy)
    {
        return new TemplateEntity()
        {
            Id = id,
            Key = key,
            Channel = channel,
            Subject = subject,
            Body = body,
            IsHtml = isHtml,
            CreatedBy = createdBy,
            LastModifiedBy = createdBy,
            CreatedOnUtc = DateTimeOffset.UtcNow,
            LastModifiedOnUtc = DateTimeOffset.UtcNow
        };
    }

    #endregion
}
