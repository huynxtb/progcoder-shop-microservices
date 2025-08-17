#region using

using Notification.Domain.Abstractions;
using Notification.Domain.Enums;

#endregion

namespace Notification.Domain.Entities;

public sealed class NotificationDelivery : Aggregate<Guid>
{
    #region Fields, Properties and Indexers

    public string EventId { get; set }

    public MessagePayload? Payload { get; private set; }

    public DeliveryStatus Status { get; set; }

    public DeliveryPriority Priority { get; set; }

    public int AttemptCount { get; set; }

    public string? LastErrorCode { get; set; }

    public string? LastErrorMessage { get; set; }

    public DateTimeOffset? SentOnUtc { get; set; }

    #endregion

    #region Ctors

    private NotificationDelivery() { }

    #endregion

    #region Methods

    public static NotificationDelivery Create(
        ChannelType channel,
        string address,
        string subject,
        string body,
        DeliveryPriority priority,
        string modifiedBy)
    {
        var payload = MessagePayload.Create(
            channel: channel,
            subject: subject,
            address: address,
            body: body);

        return new NotificationDelivery()
        {
            Payload = payload,
            Status = DeliveryStatus.Queued,
            Priority = priority,
            CreatedBy = modifiedBy,
            LastModifiedBy = modifiedBy,
            CreatedOnUtc = DateTimeOffset.UtcNow,
            LastModifiedOnUtc = DateTimeOffset.UtcNow
        };
    }

    public void UpdateStatus(DeliveryStatus status, string modifiedBy)
    {
        Status = status;
        LastModifiedBy = modifiedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
        SentOnUtc = status == DeliveryStatus.Sent ? DateTimeOffset.UtcNow : SentOnUtc;
    }

    public void AddError(string errorCode, string errorMessage)
    {
        LastErrorCode = errorCode;
        LastErrorMessage = errorMessage;
    }

    public void IncreaseAttemptCount()
    {
        AttemptCount += 1;
    }

    #endregion
}
