#region using

using Order.Domain.Abstractions;
using Order.Infrastructure.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

#endregion

namespace Order.Infrastructure.Data.Interceptors;

public sealed class AuditableEntityInterceptor : SaveChangesInterceptor
{
    #region Override Methods

    public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
    {
        UpdateEntities(eventData.Context);
        return base.SavingChanges(eventData, result);
    }

    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData,
        InterceptionResult<int> result,
        CancellationToken cancellationToken = default)
    {
        UpdateEntities(eventData.Context);
        return base.SavingChangesAsync(eventData, result, cancellationToken);
    }

    #endregion

    #region Methods

    public static void UpdateEntities(DbContext? context)
    {
        if (context == null) return;

        foreach (var entry in context.ChangeTracker.Entries<IAuditable>())
        {
            if (entry.State == EntityState.Added)
            {
                // For new entities, set both created and modified timestamps
                entry.Entity.CreatedOnUtc = DateTimeOffset.UtcNow;
                entry.Entity.LastModifiedOnUtc = DateTimeOffset.UtcNow;
            }
            else if (entry.State == EntityState.Modified || entry.HasChangedOwnedEntities())
            {
                // For existing entities, only update the modified timestamp
                entry.Entity.LastModifiedOnUtc = DateTimeOffset.UtcNow;
            }
        }
    }

    #endregion
}
