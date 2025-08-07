#region using

using Domain.Abstractions;

#endregion

namespace Domain.Entities;

public class AccountSubscription : Entity<Guid>
{
    #region Fields, Properties and Indexers

    // FK → AccountProfile.Id
    public long AccountId { get; set; }

    public AccountProfile AccountProfile { get; set; } = new();

    // FK → Subscription.Id
    public long SubscriptionId { get; set; }

    public Subscription Subscription { get; set; } = new();

    public DateTime ExpiredDatetime { get; set; }

    public string Token { get; set; } = default!;

    #endregion
}
