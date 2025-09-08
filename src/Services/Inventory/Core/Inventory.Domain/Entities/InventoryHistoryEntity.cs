#region using

using Inventory.Domain.Abstractions;

#endregion

namespace Inventory.Domain.Entities;

public sealed class InventoryHistoryEntity : EntityId<Guid>
{
    #region Fields, Properties and Indexers

    public Guid InventoryItemId { get; private set; }

    public DateTimeOffset ChangedAt { get; private set; }

    public int ChangeAmount { get; private set; }

    public int QuantityAfterChange { get; private set; }

    public string Source { get; private set; } = default!;

    #endregion

    #region Ctors

    private InventoryHistoryEntity() { }

    #endregion

    #region Methods

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
