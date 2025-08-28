//#region using

//using Inventory.Domain.Abstractions;
//using Inventory.Domain.ValueObjects;
//using SourceCommon.Constants;

//#endregion

//namespace Inventory.Domain.Entities;

//public sealed class InventoryItemEntity : Entity<Guid>
//{
//    #region Fields, Properties and Indexers

//    public Guid ProductId { get; private set; }

//    public Location Location { get; private set; } = default!;

//    public long Quantity { get; private set; }

//    public long Reserved { get; private set; }

//    public long Available => Quantity - Reserved;

//    #endregion

//    #region Ctors

//    private InventoryItemEntity() { }

//    #endregion

//    #region Methods

//    public static InventoryItemEntity Create(
//        Guid id, 
//        Guid productId, 
//        Location location, 
//        long quantity = 0, 
//        string createdBy = SystemConst.CreatedBySystem)
//    {
//        if (quantity < 0) throw new ArgumentOutOfRangeException(nameof(quantity));

//        var entity = new InventoryItemEntity
//        {
//            Id = id,
//            ProductId = productId,
//            Location = location,
//            Quantity = quantity,
//            Reserved = 0,
//            CreatedBy = createdBy,
//            LastModifiedBy = createdBy
//        };

//        return entity;
//    }

//    public void Increase(
//        long amount,
//        string source, 
//        string modifiedBy = SystemConst.CreatedBySystem)
//    {
//        if (amount <= 0) throw new ArgumentOutOfRangeException(nameof(amount));

//        Quantity += amount;
//        LastModifiedBy = modifiedBy;

//        //AddDomainEvent(new StockChangedDomainEvent(Id, ProductId, Location.ToString(), amount, InventoryChangeType.Increase, source));
//    }

//    public void Decrease(long amount, string source, string modifiedBy = SystemConst.CreatedBySystem)
//    {
//        if (amount <= 0) throw new ArgumentOutOfRangeException(nameof(amount));
//        if (Quantity - amount < 0) throw new InvalidOperationException("Insufficient quantity.");

//        Quantity -= amount;
//        LastModifiedBy = modifiedBy;

//        //AddDomainEvent(new StockChangedDomainEvent(Id, ProductId, Location.ToString(), -amount, InventoryChangeType.Decrease, source));
//    }

//    public void Reserve(long amount, Guid reservationId, string modifiedBy = SystemConst.CreatedBySystem)
//    {
//        if (amount <= 0) throw new ArgumentOutOfRangeException(nameof(amount));
//        if (Available < amount) throw new InvalidOperationException("Not enough available to reserve.");

//        Reserved += amount;
//        LastModifiedBy = modifiedBy;

//        //AddDomainEvent(new ReservedDomainEvent(Id, ProductId, Location.ToString(), reservationId, amount));
//        //AddDomainEvent(new StockChangedDomainEvent(Id, ProductId, Location.ToString(), 0, InventoryChangeType.Reserve, $"reservation:{reservationId}"));
//    }

//    public void Release(long amount, Guid reservationId, string modifiedBy = SystemConst.CreatedBySystem)
//    {
//        if (amount <= 0) throw new ArgumentOutOfRangeException(nameof(amount));
//        if (Reserved - amount < 0) throw new InvalidOperationException("Release exceeds reserved.");

//        Reserved -= amount;
//        LastModifiedBy = modifiedBy;

//        //AddDomainEvent(new UnreservedDomainEvent(Id, ProductId, Location.ToString(), reservationId, amount));
//        //AddDomainEvent(new StockChangedDomainEvent(Id, ProductId, Location.ToString(), 0, InventoryChangeType.Release, $"reservation:{reservationId}"));
//    }

//    /// <summary>Xuất kho: trừ quantity và giảm reserved tương ứng.</summary>
//    public void Commit(long amount, Guid reservationId, string modifiedBy = SystemConst.CreatedBySystem)
//    {
//        if (amount <= 0) throw new ArgumentOutOfRangeException(nameof(amount));
//        if (Reserved - amount < 0) throw new InvalidOperationException("Commit exceeds reserved.");
//        if (Quantity - amount < 0) throw new InvalidOperationException("Commit exceeds quantity.");
        
//        Reserved -= amount;
//        Quantity -= amount;
//        LastModifiedBy = modifiedBy;

//        //AddDomainEvent(new StockChangedDomainEvent(Id, ProductId, Location.ToString(), -amount, InventoryChangeType.Commit, $"reservation:{reservationId}"));
//    }

//    /// <summary>Chuyển kho: giảm ở kho hiện tại (Decrease). Kho nhận gọi Increase ở đối tượng khác.</summary>
//    public void TransferOut(long amount, string toLocation, string reference, string modifiedBy = SystemConst.CreatedBySystem)
//    {
//        if (amount <= 0) throw new ArgumentOutOfRangeException(nameof(amount));
//        if (Available < amount) throw new InvalidOperationException("Not enough available to transfer.");
        
//        Quantity -= amount;
//        LastModifiedBy = modifiedBy;
        
//        //AddDomainEvent(new StockChangedDomainEvent(Id, ProductId, Location.ToString(), -amount, InventoryChangeType.Decrease, $"transfer:{reference}:{toLocation}"));
//        //AddDomainEvent(new TransferOutDomainEvent(Id, ProductId, Location.ToString(), toLocation, amount, reference));
//    }

//    public bool HasAvailable(long amount)
//    {
//        if (amount <= 0) throw new ArgumentOutOfRangeException(nameof(amount));
//        return Available >= amount;
//    }

//    #endregion
//}
