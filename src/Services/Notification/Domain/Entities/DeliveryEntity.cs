#region using

using Notification.Domain.Abstractions;
using Notification.Domain.Enums;
using SourceCommon.Constants;

#endregion

namespace Notification.Domain.Entities;

public sealed class DeliveryEntity : Aggregate<Guid>
{
    #region Fields, Properties and Indexers

    public string? EventId { get; set; }

    public MessagePayloadEntity? Payload { get; set; }

    public DeliveryStatus Status { get; set; }

    public DeliveryPriority Priority { get; set; }

    public int AttemptCount { get; set; }

    public int MaxAttempts { get; set; }

    public string? LastErrorMessage { get; set; }

    public DateTimeOffset? SentOnUtc { get; set; }

    public DateTimeOffset? ProcessedOnUtc { get; set; }

    public DateTimeOffset? NextAttemptUtc { get; set; }

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
        List<string>? cc = null,
        List<string>? bcc = null,
        string createdBy = SystemConst.CreatedBySystem)
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
            CreatedBy = createdBy,
            LastModifiedBy = createdBy,
            CreatedOnUtc = DateTimeOffset.UtcNow,
            LastModifiedOnUtc = DateTimeOffset.UtcNow
        };
    }

    public void UpdateStatus(DeliveryStatus status, string modifiedBy = SystemConst.CreatedBySystem)
    {
        Status = status;
        LastModifiedBy = modifiedBy;
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
