#region using

using Inventory.Domain.Abstractions;
using Inventory.Domain.Enums;
using Inventory.Domain.ValueObjects;
using SourceCommon.Constants;
using System.Collections.Generic;

#endregion

namespace Inventory.Domain.Entities;

public sealed class InventoryReservationEntity : Aggregate<Guid>
{
    #region Fields, Properties and Indexers

    public Guid ProductId { get; private set; }

    public Guid ReferenceId { get; private set; }

    public long Quantity { get; private set; }

    public DateTimeOffset? ExpiresAt { get; private set; }

    public ReservationStatus Status { get; private set; } = ReservationStatus.Pending;

    public Location Location { get; private set; } = default!;

    #endregion

    #region Ctors

    private InventoryReservationEntity() { }

    #endregion

    #region Methods

    public static InventoryReservationEntity Create(
        Guid id,
        Guid productId,
        Guid locationId,
        Guid referenceId,
        long quantity,
        DateTimeOffset? expiresAt,
        string createdBy = SystemConst.CreatedBySystem)
    {
        if (quantity <= 0) throw new ArgumentOutOfRangeException(nameof(quantity));

        var entity = new InventoryReservationEntity
        {
            Id = id,
            ProductId = productId,
            ReferenceId = referenceId,
            Quantity = quantity,
            ExpiresAt = expiresAt,
            CreatedBy = createdBy,
            LastModifiedBy = createdBy
        };

        //entity.AddDomainEvent(new ReservationCreatedDomainEvent(id, productId, location.ToString(), referenceId, quantity, expiresAt));

        return entity;
    }

    public void MarkCommitted(string modifiedBy = SystemConst.CreatedBySystem)
    {
        if (Status != ReservationStatus.Pending) throw new InvalidOperationException("Only pending reservations can be committed.");

        Status = ReservationStatus.Committed;
        LastModifiedBy = modifiedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;

        //AddDomainEvent(new ReservationCommittedDomainEvent(Id, ProductId, Location.ToString(), ReferenceId, Quantity));
    }

    public void Release(string reason, string modifiedBy = SystemConst.CreatedBySystem)
    {
        if (Status != ReservationStatus.Pending) return;

        Status = ReservationStatus.Released;
        LastModifiedBy = modifiedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;

        //AddDomainEvent(new ReservationReleasedDomainEvent(Id, ProductId, Location.ToString(), ReferenceId, Quantity, reason));
    }

    public void Expire()
    {
        if (Status == ReservationStatus.Pending && ExpiresAt.HasValue && ExpiresAt.Value <= DateTimeOffset.UtcNow)
        {
            Status = ReservationStatus.Expired;

            //AddDomainEvent(new ReservationExpiredDomainEvent(Id, ProductId, Location.ToString(), ReferenceId, Quantity));
        }
    }

    #endregion
}

