#region using

using Notification.Domain.Enums;

#endregion

namespace Notification.Domain.Entities;

public sealed class MessagePayload
{
    #region Fields, Properties and Indexers

    public ChannelType Channel { get; private set; }

    public IReadOnlySet<string> To { get; private set; }

    public IReadOnlySet<string>? Cc { get; private set; }

    public IReadOnlySet<string>? Bcc { get; private set; }

    public string? Subject { get; private set; }

    public string? Body { get; private set; }

    public bool IsHtml { get; private set; }

    #endregion

    #region Ctors

    private MessagePayload() { }

    #endregion

    #region Methods

    public static MessagePayload Create(
        ChannelType channel,
        HashSet<string> to,
        string subject,
        string body,
        bool isHtml = false,
        HashSet<string> cc = null,
        HashSet<string> bcc = null)
    {
        return new MessagePayload()
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
