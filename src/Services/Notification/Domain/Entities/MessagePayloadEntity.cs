#region using

using Notification.Domain.Enums;

#endregion

namespace Notification.Domain.Entities;

public sealed class MessagePayloadEntity
{
    #region Fields, Properties and Indexers

    public ChannelType Channel { get; set; }

    public IReadOnlyCollection<string>? To { get; set; }

    public IReadOnlyCollection<string>? Cc { get; set; }

    public IReadOnlyCollection<string>? Bcc { get; set; }

    public string? Subject { get; set; }

    public string? Body { get; set; }

    public bool IsHtml { get; set; }

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
