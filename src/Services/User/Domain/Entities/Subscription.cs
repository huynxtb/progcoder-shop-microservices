#region using

using Domain.Abstractions;

#endregion

namespace Domain.Entities;

public class Subscription : Entity<long>
{
    #region Fields, Properties and Indexers

    public string Name { get; set; } = default!;

    public long Detail { get; set; }

    // 1 – * ← AccountSubscription
    public ICollection<AccountSubscription>? AccountSubscriptions { get; set; }

    #endregion
}
