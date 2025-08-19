#region using

using Notification.Domain.Abstractions;
using Notification.Domain.Enums;
using System.Threading;

#endregion

namespace Notification.Domain.Entities;

public sealed class AppNotification : Entity<Guid>
{
    #region Fields, Properties and Indexers

    public Guid UserId { get; set; }

    public string? Title { get; set; }

    public string? Message { get; set; }

    public bool IsRead { get; set; }

    public DateTimeOffset? ReadAt { get; set; }

    #endregion

    #region Ctors

    private AppNotification() { }

    #endregion

    #region Methods

    public static AppNotification Create(
        Guid id,
        Guid userId,
        string title,
        string message,
        string createdBy)
    {
        return new AppNotification()
        {
            Id = id,
            UserId = userId,
            Title = title,
            Message = message,
            CreatedBy = createdBy,
            LastModifiedBy = createdBy,
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
