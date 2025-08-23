#region using

using User.Domain.Abstractions;
using User.Domain.Events;

#endregion

namespace User.Domain.Entities;

public sealed class LoginHistoryEntity : Aggregate<Guid>
{
    #region Fields, Properties and Indexers

    public Guid UserId { get; private set; }

    public string? IpAddress { get; private set; }

    public DateTimeOffset LoggedOnUtc { get; private set; }

    public UserEntity User { get; private set; } = default!;

    #endregion

    #region Ctors

    private LoginHistoryEntity() { }

    #endregion

    #region Methods

    public static LoginHistoryEntity Create(
        Guid id, 
        Guid userId, 
        string? ipAddress, 
        DateTimeOffset loggedAt,
        string createdBy)
    {
        var loginHistory = new LoginHistoryEntity
        {
            Id = id,
            UserId = userId,
            IpAddress = ipAddress,
            LoggedOnUtc = loggedAt,
            CreatedBy = createdBy,
            LastModifiedBy = createdBy,
        };

        loginHistory.AddDomainEvent(new LoginHistoryCreatedDomainEvent(loginHistory));

        return loginHistory;
    }

    #endregion
}
