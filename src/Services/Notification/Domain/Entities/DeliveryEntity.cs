#region using

using Notification.Domain.Abstractions;
using Notification.Domain.Enums;
using Common.Constants;

#endregion

namespace Notification.Domain.Entities;

public sealed class DeliveryEntity : Aggregate<Guid>
{
    #region Fields, Properties and Indexers

    public string? EventId { get; private set; }

    public MessagePayloadEntity? Payload { get; private set; }

    public DeliveryStatus Status { get; private set; }

    public DeliveryPriority Priority { get; private set; }

    public int AttemptCount { get; private set; }

    public int MaxAttempts { get; private set; }

    public string? LastErrorMessage { get; private set; }

    public DateTimeOffset? SentOnUtc { get; private set; }

    public DateTimeOffset? ProcessedOnUtc { get; private set; }

    public DateTimeOffset? NextAttemptUtc { get; private set; }

    #endregion

    #region Ctors

    private DeliveryEntity() { }

    #endregion

    #region Methods

    public static DeliveryEntity Create(
        Guid id,
        ChannelType channel,
        List<string> to,
        string subject,
        bool isHtml,
		string body,
        DeliveryPriority priority,
        string eventId,
        string performedBy,
        List<string>? cc = null,
        List<string>? bcc = null)
    {
        var payload = MessagePayloadEntity.Create(
            channel: channel,
            subject: subject,
            isHtml: isHtml,
            to: to,
            cc: cc,
            bcc: bcc,
            body: body);

        return new DeliveryEntity()
        {
            Id = id,
            Payload = payload,
            Status = DeliveryStatus.Queued,
            Priority = priority,
            EventId = eventId,
            MaxAttempts = SystemConst.MaxAttempts,
            CreatedBy = performedBy,
            LastModifiedBy = performedBy,
            CreatedOnUtc = DateTimeOffset.UtcNow,
            LastModifiedOnUtc = DateTimeOffset.UtcNow
        };
    }

    public void UpdateStatus(DeliveryStatus status, string performedBy)
    {
        Status = status;
        LastModifiedBy = performedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
        SentOnUtc = status == DeliveryStatus.Sent ? DateTimeOffset.UtcNow : SentOnUtc;
        ProcessedOnUtc = DateTimeOffset.UtcNow;
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
