#region using

using Notification.Domain.Enums;

#endregion

namespace Notification.Domain.Entities;

public sealed class MessagePayload
{
    #region Fields, Properties and Indexers

    public ChannelType Channel { get; private set; }

    public string? Address { get; set; }

    public string? Subject { get; set; }

    public string? Body { get; set; }

    #endregion

    #region Ctors

    private MessagePayload() { }

    #endregion

    #region Methods

    public static MessagePayload Create(
        ChannelType channel,
        string address,
        string subject,
        string body)
    {
        return new MessagePayload()
        {
            Channel = channel,
            Address = address,
            Subject = subject,
            Body = body
        };
    }

    #endregion
}
