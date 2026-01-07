#region using

using Inventory.Domain.Abstractions;

#endregion

namespace Inventory.Domain.Entities;

public sealed class InventoryHistoryEntity : Entity<Guid>
{
    #region Fields, Properties and Indexers

    public string Message { get; set; } = default!;

    #endregion

    #region Factories

    public static InventoryHistoryEntity Create(Guid id, string message, string performBy)
    {
        var now = DateTimeOffset.UtcNow;
        return new InventoryHistoryEntity
        {
            Id = id,
            Message = message,
            CreatedBy = performBy,
            CreatedOnUtc = now,
            LastModifiedBy = performBy,
            LastModifiedOnUtc = now
        };
    }

    #endregion
}
