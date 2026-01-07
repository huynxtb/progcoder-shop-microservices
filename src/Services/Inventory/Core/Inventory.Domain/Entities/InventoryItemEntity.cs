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

    public Product Product { get; set; } = default!;

    public int Quantity { get; set; }

    public int Reserved { get; set; }

    public int Available => Quantity - Reserved;

    public Guid LocationId { get; set; }

    public LocationEntity Location { get; set; } = default!;

    #endregion

    #region Factories

    public static InventoryItemEntity Create(Guid id,
        Guid productId,
        string productName,
        Guid locationId,
        string performedBy,
        int quantity = 0)
    {
        if (quantity < 0) throw new ArgumentOutOfRangeException(nameof(quantity));
        if (locationId == Guid.Empty) throw new ArgumentException(nameof(locationId));

        var entity = new InventoryItemEntity
        {
            Id = id,
            Product = Product.Of(productId, productName),
            Quantity = quantity,
            Reserved = 0,
            LocationId = locationId,
            CreatedBy = performedBy,
            LastModifiedBy = performedBy
        };

        entity.AddDomainEvent(new StockChangedDomainEvent(id,
            productId,
            productName,
            quantity,
            0,
            quantity,
            InventoryChangeType.Init,
            InventorySource.ManualAdjustment.GetDescription(),
            entity.Available));

        return entity;
    }

    #endregion

    #region Methods

    public void Update(Guid locationId,
        string? oldLocationName,
        string? newLocationName,
        string performedBy,
        Guid productId,
        string productName)
    {
        if (locationId == Guid.Empty) throw new ArgumentException(nameof(locationId));

        var oldLocationId = LocationId;
        var locationChanged = oldLocationId != locationId;

        Product = Product.Of(productId, productName);
        LocationId = locationId;
        LastModifiedBy = performedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;

        if (locationChanged)
        {
            AddDomainEvent(new LocationChangedDomainEvent(
                Id,
                Product.Id,
                Product.Name!,
                oldLocationName!,
                newLocationName!));
        }
    }

    public void Increase(
        int amount,
        string source,
        string performedBy)
    {
        if (amount <= 0) throw new DomainException(MessageCode.OutOfRange);

        var oldQuantity = Quantity;

        Quantity += amount;
        LastModifiedBy = performedBy;

        AddDomainEvent(new StockChangedDomainEvent(Id,
            Product.Id,
            Product.Name!,
            amount,
            oldQuantity,
            Quantity,
            InventoryChangeType.Increase,
            source,
            Available));
    }

    public void Decrease(
        int amount,
        string source,
        string performedBy)
    {
        if (amount <= 0) throw new DomainException(MessageCode.OutOfRange);
        if (Quantity - amount < 0) throw new DomainException(MessageCode.InsufficientStock);
        if (Quantity - amount < Reserved) throw new DomainException(MessageCode.InsufficientStock);

        var oldQuantity = Quantity;

        Quantity -= amount;
        LastModifiedBy = performedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;

        AddDomainEvent(new StockChangedDomainEvent(Id,
            Product.Id,
            Product.Name!,
            amount,
            oldQuantity,
            Quantity,
            InventoryChangeType.Decrease,
            source,
            Available));
    }

    public bool HasAvailable(int amount)
    {
        if (amount <= 0) throw new DomainException(MessageCode.OutOfRange);
        return Available >= amount;
    }

    public bool IsLocationChanged(Guid newLocationId)
    {
        if (newLocationId == Guid.Empty) throw new ArgumentException(nameof(newLocationId));
        return LocationId != newLocationId;
    }

    public void Delete()
    {
        AddDomainEvent(new InventoryItemDeletedDomainEvent(this));
    }

    public void Reserve(int amount, Guid reservationId, string performedBy)
    {
        if (amount <= 0) throw new DomainException(MessageCode.OutOfRange);
        if (Quantity < amount) throw new DomainException(MessageCode.InsufficientStock);

        var oldQuantity = Quantity;

        Quantity -= amount;
        Reserved += amount;
        LastModifiedBy = performedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;

        AddDomainEvent(new StockChangedDomainEvent(
            Id,
            Product.Id,
            Product.Name!,
            amount,
            oldQuantity,
            Quantity,
            InventoryChangeType.Reserve,
            InventorySource.OrderService.GetDescription(),
            Available));
    }

    public void Unreserve(int amount, Guid reservationId, string performedBy)
    {
        if (amount <= 0) throw new DomainException(MessageCode.OutOfRange);
        if (Reserved < amount) throw new DomainException(MessageCode.InvalidReservationAmount);

        var oldQuantity = Quantity;

        Quantity += amount;
        Reserved -= amount;
        LastModifiedBy = performedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;

        AddDomainEvent(new StockChangedDomainEvent(
            Id,
            Product.Id,
            Product.Name!,
            amount,
            oldQuantity,
            Quantity,
            InventoryChangeType.Release,
            InventorySource.OrderService.GetDescription(),
            Available));
    }

    public void CommitReservation(int amount, string performedBy)
    {
        if (amount <= 0) throw new DomainException(MessageCode.OutOfRange);
        if (Reserved < amount) throw new DomainException(MessageCode.InvalidReservationAmount);

        var oldQuantity = Quantity;

        Reserved -= amount;
        LastModifiedBy = performedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;

        AddDomainEvent(new StockChangedDomainEvent(
            Id,
            Product.Id,
            Product.Name!,
            amount,
            oldQuantity,
            Quantity,
            InventoryChangeType.Commit,
            InventorySource.OrderService.GetDescription(),
            Available));
    }

    #endregion
}
