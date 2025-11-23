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
    public Guid? UserId { get; private set; }

    public string? Title { get; private set; }

    public string? Message { get; private set; }

    public bool IsRead { get; private set; }

    public DateTimeOffset? ReadAt { get; private set; }

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

    #endregion
}
