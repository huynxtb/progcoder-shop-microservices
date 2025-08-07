#region using

using Domain.Abstractions;
using Domain.Events;

#endregion

namespace Domain.Entities;

public class AccountProfile : Entity<long>
{
    #region Fields, Properties and Indexers

    public Guid KeycloakUserNo { get; set; }

    public KeycloakUser? KeycloakUser { get; set; }

    public string? Bio { get; set; }

    public DateOnly? Birthday { get; set; }

    // 1 – * ← Agent
    public ICollection<Agent>? Agents { get; set; }

    // 1 – * ← AccountSubscription
    public ICollection<AccountSubscription>? Subscriptions { get; set; }

    #endregion

    public static AccountProfile Create(Guid keycloakUserNo,
        string bio,
        string modifiedBy)
    {
        var acc = new AccountProfile
        {
            KeycloakUserNo = keycloakUserNo,
            Bio = bio,
            CreatedBy = modifiedBy,
            LastModifiedBy = modifiedBy
        };

        return acc;
    }
}
