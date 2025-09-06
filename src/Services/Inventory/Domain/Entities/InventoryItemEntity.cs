#region using

using Inventory.Domain.Abstractions;
using Inventory.Domain.Enums;
using Inventory.Domain.Events;
using Inventory.Domain.Exceptions;
using Inventory.Domain.ValueObjects;
using Common.Constants;
using Common.Extensions;

#endregion

namespace Inventory.Domain.Entities;

public sealed class InventoryItemEntity : Aggregate<Guid>
{
    #region Fields, Properties and Indexers

    public Product Product { get; private set; } = default!;

    public int Quantity { get; private set; }

    public int Reserved { get; private set; }

    public int Available => Quantity - Reserved;

    public Location Location { get; private set; } = default!;

    #endregion

    #region Ctors

    private InventoryItemEntity() { }

    #endregion

    #region Methods

    public static InventoryItemEntity Create(
        Guid id,
        Guid productId,
        string productName,
        string location,
        string performedBy,
        int quantity = 0)
    {
        if (quantity < 0) throw new ArgumentOutOfRangeException(nameof(quantity));
        if (string.IsNullOrWhiteSpace(location)) throw new ArgumentNullException(nameof(location));

        var entity = new InventoryItemEntity
        {
            Id = id,
            Product = Product.Of(productId, productName),
            Quantity = quantity,
            Reserved = 0,
            CreatedBy = performedBy,
            LastModifiedBy = performedBy,
            Location = Location.Of(location)
        };
        entity.AddDomainEvent(new StockChangedDomainEvent(id, 
            productId, 
            quantity, 
            quantity, 
            InventoryChangeType.Init, 
            InventorySource.ManualAdjustment.GetDescription()));
        return entity;
    }

    public void Increase(
        int amount,
        string source, // order-service
        string performedBy)
    {
        if (amount <= 0) throw new DomainException(MessageCode.OutOfRange);

        Quantity += amount;
        LastModifiedBy = performedBy;

        AddDomainEvent(new StockChangedDomainEvent(Id, Product.Id, amount, Available, InventoryChangeType.Increase, source));
    }

    public void Decrease(
        int amount, 
        string source,
        string performedBy)
    {
        if (amount <= 0) throw new DomainException(MessageCode.OutOfRange);
        if (Quantity - amount < 0) throw new DomainException(MessageCode.InsufficientStock);

        Quantity -= amount;
        LastModifiedBy = performedBy;

        AddDomainEvent(new StockChangedDomainEvent(Id, Product.Id, amount, Available, InventoryChangeType.Decrease, source));
    }

    //public void Reserve(
    //    int amount, 
    //    Guid reservationId, 
    //    string modifiedBy = SystemConst.CreatedBySystem)
    //{
    //    if (amount <= 0) throw new DomainException(MessageCode.OutOfRange);
    //    if (Available < amount) throw new InvalidOperationException(MessageCode.NotEnoughAvailable);

    //    Reserved += amount;
    //    LastModifiedBy = modifiedBy;

    //    AddDomainEvent(new ReservedDomainEvent(Id, Product.Id, reservationId, amount));
    //    AddDomainEvent(new StockChangedDomainEvent(Id, Product.Id, 0, InventoryChangeType.Reserve, $"reservation:{reservationId}"));
    //}

    //public void Release(
    //    int amount, 
    //    Guid reservationId, 
    //    string modifiedBy = SystemConst.CreatedBySystem)
    //{
    //    if (amount <= 0) throw new DomainException(MessageCode.OutOfRange);
    //    if (Reserved - amount < 0) throw new InvalidOperationException(MessageCode.ReleaseExceedsReserved);

    //    Reserved -= amount;
    //    LastModifiedBy = modifiedBy;

    //    AddDomainEvent(new UnreservedDomainEvent(Id, Product.Id, reservationId, amount));
    //    AddDomainEvent(new StockChangedDomainEvent(Id, Product.Id, 0, InventoryChangeType.Release, $"reservation:{reservationId}"));
    //}

    //public void Commit(
    //    int amount, 
    //    Guid reservationId, 
    //    string modifiedBy = SystemConst.CreatedBySystem)
    //{
    //    if (amount <= 0) throw new DomainException(MessageCode.OutOfRange);
    //    if (Reserved - amount < 0) throw new InvalidOperationException(MessageCode.CommitExceedsReserved);
    //    if (Quantity - amount < 0) throw new InvalidOperationException(MessageCode.CommitExceedsQuantity);

    //    Reserved -= amount;
    //    Quantity -= amount;
    //    LastModifiedBy = modifiedBy;

    //    AddDomainEvent(new StockChangedDomainEvent(Id, Product.Id, amount, InventoryChangeType.Commit, $"reservation:{reservationId}"));
    //}

    public bool HasAvailable(int amount)
    {
        if (amount <= 0) throw new DomainException(MessageCode.OutOfRange);
        return Available >= amount;
    }

    #endregion
}
