#region using

using Inventory.Domain.Abstractions;

#endregion

namespace Inventory.Domain.Entities;

public sealed class InventoryHistoryEntity : EntityId<Guid>
{
    #region Fields, Properties and Indexers

    public Guid InventoryItemId { get; set; }

    public DateTimeOffset ChangedAt { get; set; }

    public int ChangeAmount { get; set; }

    public int QuantityAfterChange { get; set; }

    public string Source { get; set; } = default!;

    #endregion

    #region Factories

    public static InventoryHistoryEntity Create(
        Guid id,
        Guid inventoryItemId,
        DateTimeOffset changedAt,
        int changeAmount,
        int quantityAfterChange,
        string source)
    {
        if (string.IsNullOrWhiteSpace(source)) throw new ArgumentNullException(nameof(source));
        var entity = new InventoryHistoryEntity
        {
            Id = id,
            InventoryItemId = inventoryItemId,
            ChangedAt = changedAt,
            ChangeAmount = changeAmount,
            QuantityAfterChange = quantityAfterChange,
            Source = source
        };
        return entity;
    }

    #endregion
}
