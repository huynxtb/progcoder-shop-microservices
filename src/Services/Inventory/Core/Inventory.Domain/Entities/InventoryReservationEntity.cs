#region using

using Inventory.Domain.Abstractions;
using Inventory.Domain.Enums;
using Inventory.Domain.ValueObjects;
using Common.Constants;
using System.Collections.Generic;

#endregion

namespace Inventory.Domain.Entities;

public sealed class InventoryReservationEntity : Aggregate<Guid>
{
    #region Fields, Properties and Indexers

    public Product Product { get; set; } = default!;

    public Guid ReferenceId { get; set; }

    public int Quantity { get; set; }

    public DateTimeOffset? ExpiresAt { get; set; }

    public ReservationStatus Status { get; set; }

    public Guid LocationId { get; set; }

    public LocationEntity Location { get; set; } = default!;

    #endregion

    #region Factories

    public static InventoryReservationEntity Create(
        Guid id,
        Guid productId,
        string productName,
        Guid referenceId,
        Guid locationId,
        int quantity,
        DateTimeOffset? expiresAt,
        string performedBy)
    {
        if (quantity <= 0) throw new ArgumentOutOfRangeException(nameof(quantity));
        if (locationId == Guid.Empty) throw new ArgumentException("LocationId cannot be empty", nameof(locationId));

        var entity = new InventoryReservationEntity
        {
            Id = id,
            Product = Product.Of(productId, productName),
            ReferenceId = referenceId,
            LocationId = locationId,
            Quantity = quantity,
            ExpiresAt = expiresAt,
            Status = ReservationStatus.Pending,
            CreatedBy = performedBy,
            LastModifiedBy = performedBy
        };

        //entity.AddDomainEvent(new ReservationCreatedDomainEvent(id, productId, productName, referenceId, locationId, quantity, expiresAt));

        return entity;
    }

    #endregion

    #region Methods

    public void MarkCommitted(string performedBy)
    {
        if (Status != ReservationStatus.Pending) throw new InvalidOperationException(MessageCode.CannotCommitNonPendingReservation);

        Status = ReservationStatus.Committed;
        LastModifiedBy = performedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;

        //AddDomainEvent(new ReservationCommittedDomainEvent(Id, Product.Id, Product.Name!, ReferenceId, Quantity));
    }

    public void Release(string reason, string performedBy)
    {
        if (Status != ReservationStatus.Pending) return;

        Status = ReservationStatus.Released;
        LastModifiedBy = performedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;

        //AddDomainEvent(new ReservationReleasedDomainEvent(Id, Product.Id, Product.Name!, ReferenceId, Quantity, reason));
    }

    public void Expire()
    {
        if (Status == ReservationStatus.Pending && ExpiresAt.HasValue && ExpiresAt.Value <= DateTimeOffset.UtcNow)
        {
            Status = ReservationStatus.Expired;

            //AddDomainEvent(new ReservationExpiredDomainEvent(Id, Product.Id, Product.Name!, ReferenceId, Quantity));
        }
    }

    #endregion
}

