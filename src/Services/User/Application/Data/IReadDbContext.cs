#region using

using Microsoft.EntityFrameworkCore;
using Domain.Entities;

#endregion

namespace Application.Data;

public interface IReadDbContext
{
    #region Fields, Properties and Indexers

    DbSet<Agent> Agents { get; }

    DbSet<KeycloakUser> KeycloakUsers { get; }

    DbSet<AccountProfile> AccountProfiles { get; }

    DbSet<Subscription> Subscriptions { get; }

    DbSet<AccountSubscription> AccountSubscriptions { get; }

    DbSet<ChatThread> ChatThreads { get; }

    DbSet<ChatHistory> ChatHistories { get; }

    DbSet<Coupon> Coupons { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);

    #endregion
}
