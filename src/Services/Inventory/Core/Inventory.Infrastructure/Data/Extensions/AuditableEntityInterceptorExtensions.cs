#region using

using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Inventory.Infrastructure.Data.Extensions;

public static class AuditableEntityInterceptorExtensions
{
    #region Methods

    /// <summary>
    /// Checks if an entity has changed complex properties (value objects in EF Core 8+)
    /// </summary>
    public static bool HasChangedComplexProperties(this EntityEntry entry) =>
        entry.ComplexProperties.Any(cp => cp.IsModified);

    /// <summary>
    /// Legacy method for backward compatibility - checks for both owned entities and complex properties
    /// </summary>
    public static bool HasChangedOwnedEntities(this EntityEntry entry) =>
        // Check for owned entities (legacy approach)
        entry.References.Any(r =>
            r.TargetEntry != null &&
            r.TargetEntry.Metadata.IsOwned() &&
            (r.TargetEntry.State == EntityState.Added || r.TargetEntry.State == EntityState.Modified)) ||
        // Check for complex properties (EF Core 8+ approach)
        entry.ComplexProperties.Any(cp => cp.IsModified);

    #endregion
}
