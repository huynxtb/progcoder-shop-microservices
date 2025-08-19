#region using

using Notification.Domain.Abstractions;
using Notification.Domain.Enums;
using SourceCommon.Constants;

#endregion

namespace Notification.Domain.Entities;

public sealed class NotificationDelivery : Aggregate<Guid>
{
    #region Fields, Properties and Indexers

    public string? EventId { get; private set; }

    public MessagePayload? Payload { get; private set; }

    public DeliveryStatus Status { get; private set; }

    public DeliveryPriority Priority { get; private set; }

    public int AttemptCount { get; private set; }

    public int MaxAttempts { get; private set; }

    public string? LastErrorMessage { get; private set; }

    public DateTimeOffset? SentOnUtc { get; private set; }

    public DateTimeOffset? NextAttemptUtc { get; private set; }

    #endregion

    #region Ctors

    private NotificationDelivery() { }

    #endregion

    #region Methods

    public static NotificationDelivery Create(
        Guid id,
        ChannelType channel,
        List<string> to,
        string subject,
        bool isHtml,
		string body,
        DeliveryPriority priority,
        string eventId,
        List<string>? cc = null,
        List<string>? bcc = null,
        string createdBy = SystemConst.CreatedBySystem)
    {
        var payload = MessagePayload.Create(
            channel: channel,
            subject: subject,
            isHtml: isHtml,
            to: to,
            cc: cc,
            bcc: bcc,
            body: body);

        return new NotificationDelivery()
        {
            Id = id,
            Payload = payload,
            Status = DeliveryStatus.Queued,
            Priority = priority,
            EventId = eventId,
            MaxAttempts = SystemConst.MaxAttempts,
            CreatedBy = createdBy,
            LastModifiedBy = createdBy,
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

    public void RaiseError(
        string errorMessage,
        DateTimeOffset nextAttemptUtc)
    {
        if (AttemptCount >= MaxAttempts)
        {
            Status = DeliveryStatus.GiveUp;
            LastErrorMessage = errorMessage;
            NextAttemptUtc = null;
        }
        else
        {
            Status = DeliveryStatus.Failed;
            LastErrorMessage = errorMessage;
            var backoff = TimeSpan.FromSeconds(Math.Min(60, Math.Pow(2, AttemptCount)))
                        + TimeSpan.FromMilliseconds(Random.Shared.Next(0, 250));
            NextAttemptUtc = nextAttemptUtc + backoff;
        }
    }

    public void IncreaseAttemptCount()
    {
        AttemptCount += 1;   
    }

    #endregion
}
