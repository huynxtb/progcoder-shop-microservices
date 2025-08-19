#region using

using User.Domain.Abstractions;
using User.Domain.Events;

#endregion

namespace User.Domain.Entities;

public sealed class LoginHistory : Aggregate<Guid>
{
    #region Fields, Properties and Indexers

    public Guid UserId { get; private set; }

    public string? IpAddress { get; private set; }

    public DateTimeOffset LoggedOnUtc { get; private set; }

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
        string createdBy)
    {
        var loginHistory = new LoginHistory
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
