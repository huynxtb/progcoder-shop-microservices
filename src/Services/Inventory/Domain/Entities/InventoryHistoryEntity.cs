//#region using

//using Inventory.Domain.Abstractions;
//using Inventory.Domain.Enums;
//using Inventory.Domain.Events;
//using Inventory.Domain.ValueObjects;
//using SourceCommon.Constants;
//using static Microsoft.IO.RecyclableMemoryStreamManager;

//#endregion

//namespace Inventory.Domain.Entities;

//public sealed class InventoryHistoryEntity : Aggregate<Guid>
//{
//    #region Fields, Properties and Indexers

//    public Guid ProductId { get; private set; }

//    public Location? LocationFrom { get; private set; }

//    public Location? LocationTo { get; private set; }

//    public InventoryChangeType ChangeType { get; private set; }

//    public long QuantityChange { get; private set; }

//    public InventorySource Source { get; private set; }

//    public string? ReferenceId { get; private set; }

//    public string? IdempotencyKey { get; private set; }

//    #endregion

//    private InventoryHistoryEntity() { }

//    public static InventoryHistoryEntity Create(
//        Guid productId, 
//        string? locationFrom, 
//        string? locationTo,
//        InventoryChangeType type, 
//        long quantityChange,
//        InventorySource source, 
//        string? referenceId, 
//        string? idempotencyKey,
//        string createdBy = SystemConst.CreatedBySystem)
//    {
//        if (quantityChange == 0) throw new ArgumentOutOfRangeException(nameof(quantityChange));

//        return new InventoryHistoryEntity
//        {
//            ProductId = productId,
//            LocationFrom = string.IsNullOrWhiteSpace(locationFrom) ? null : new Location(locationFrom),
//            LocationTo = string.IsNullOrWhiteSpace(locationTo) ? null : new Location(locationTo),
//            ChangeType = type,
//            QuantityChange = quantityChange,
//            Source = source,
//            ReferenceId = referenceId,
//            IdempotencyKey = idempotencyKey,
//            CreatedBy = createdBy,
//            LastModifiedBy = createdBy
//        };
//    }
//}
