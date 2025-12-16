#region using

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Notification.Domain.Abstractions;
using Notification.Domain.Enums;
using Common.Constants;
using System.Threading;

#endregion

namespace Notification.Domain.Entities;

public sealed class NotificationEntity : Entity<Guid>
{
    #region Fields, Properties and Indexers

    [BsonRepresentation(BsonType.String)]
    public Guid? UserId { get; set; }

    public string? Title { get; set; }

    public string? Message { get; set; }

    public bool IsRead { get; set; }

    public DateTimeOffset? ReadAt { get; set; }

    public string? TargetUrl { get; set; }

    #endregion

    #region Methods

    public static NotificationEntity Create(
        Guid id,
        Guid userId,
        string title,
        string message,
        string performedBy)
    {
        return new NotificationEntity()
        {
            Id = id,
            UserId = userId,
            Title = title,
            Message = message,
            CreatedBy = performedBy,
            LastModifiedBy = performedBy,
            CreatedOnUtc = DateTimeOffset.UtcNow,
            LastModifiedOnUtc = DateTimeOffset.UtcNow
        };
    }

    public void MarkAsRead(string modifiedBy)
    {
        IsRead = true;
        ReadAt = DateTimeOffset.UtcNow;
        LastModifiedBy = modifiedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
    }

    public void UpdateTargetUrl(string targetUrl, string modifiedBy)
    {
        TargetUrl = targetUrl;
        LastModifiedBy = modifiedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
    }

    #endregion
}
