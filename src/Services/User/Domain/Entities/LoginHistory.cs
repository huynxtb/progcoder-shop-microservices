#region using

using Domain.Abstractions;
using Domain.Events;

#endregion

namespace Domain.Entities;

public sealed class LoginHistory : Aggregate<Guid>
{
    #region Fields, Properties and Indexers

    public Guid UserId { get; private set; }

    public string? IpAddress { get; private set; }

    public DateTimeOffset LoggedAt { get; private set; }

    public User User { get; private set; } = default!;

    #endregion

    #region Ctors

    private LoginHistory()
    {
    }

    #endregion

    #region Methods

    public static LoginHistory Create(
        Guid id, 
        Guid userId, 
        string? ipAddress, 
        DateTimeOffset loggedAt,
        string modifiedBy)
    {
        var loginHistory = new LoginHistory
        {
            Id = id,
            UserId = userId,
            IpAddress = ipAddress,
            LoggedAt = loggedAt,
            CreatedBy = modifiedBy,
            LastModifiedBy = modifiedBy
        };

        loginHistory.AddDomainEvent(new LoginHistoryCreatedDomainEvent(loginHistory));

        return loginHistory;
    }

    #endregion
}
