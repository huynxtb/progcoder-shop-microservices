#region using

using Notification.Domain.Enums;

#endregion

namespace Notification.Domain.Entities;

public sealed class MessagePayloadEntity
{
    #region Fields, Properties and Indexers

    public ChannelType Channel { get; private set; }

    public IReadOnlyCollection<string>? To { get; private set; }

    public IReadOnlyCollection<string>? Cc { get; private set; }

    public IReadOnlyCollection<string>? Bcc { get; private set; }

    public string? Subject { get; private set; }

    public string? Body { get; private set; }

    public bool IsHtml { get; private set; }

    #endregion

    #region Ctors

    private MessagePayloadEntity() { }

    #endregion

    #region Methods

    public static MessagePayloadEntity Create(
        ChannelType channel,
        List<string> to,
        string subject,
        string body,
        bool isHtml = false,
        List<string>? cc = null,
        List<string>? bcc = null)
    {
        return new MessagePayloadEntity()
        {
            Channel = channel,
            To = to,
            Cc = cc,
            Bcc = bcc,
            Subject = subject,
            Body = body,
            IsHtml = isHtml,
        };
    }

    #endregion
}
