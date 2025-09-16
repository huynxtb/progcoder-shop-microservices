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

    public Product Product { get; private set; } = default!;

    public Guid ReferenceId { get; private set; }

    public long Quantity { get; private set; }

    public DateTimeOffset? ExpiresAt { get; private set; }

    public ReservationStatus Status { get; private set; }

    public Location Location { get; private set; } = default!;

    #endregion

    #region Factories

    public static InventoryReservationEntity Create(
        Guid id,
        Guid productId,
        string productName,
        Guid referenceId,
        long quantity,
        DateTimeOffset? expiresAt,
        string performedBy)
    {
        if (quantity <= 0) throw new ArgumentOutOfRangeException(nameof(quantity));

        var entity = new InventoryReservationEntity
        {
            Id = id,
            Product = Product.Of(productId, productName),
            ReferenceId = referenceId,
            Quantity = quantity,
            ExpiresAt = expiresAt,
            CreatedBy = performedBy,
            LastModifiedBy = performedBy
        };

        //entity.AddDomainEvent(new ReservationCreatedDomainEvent(id, Product.Id, location.ToString(), referenceId, quantity, expiresAt));

        return entity;
    }

    #endregion

    #region Methods

    public void MarkCommitted(string performedBy)
    {
        if (Status != ReservationStatus.Pending) throw new InvalidOperationException("Only pending reservations can be committed.");

        Status = ReservationStatus.Committed;
        LastModifiedBy = performedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;

        //AddDomainEvent(new ReservationCommittedDomainEvent(Id, Product.Id, Location.ToString(), ReferenceId, Quantity));
    }

    public void Release(string reason, string performedBy)
    {
        if (Status != ReservationStatus.Pending) return;

        Status = ReservationStatus.Released;
        LastModifiedBy = performedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;

        //AddDomainEvent(new ReservationReleasedDomainEvent(Id, Product.Id, Location.ToString(), ReferenceId, Quantity, reason));
    }

    public void Expire()
    {
        if (Status == ReservationStatus.Pending && ExpiresAt.HasValue && ExpiresAt.Value <= DateTimeOffset.UtcNow)
        {
            Status = ReservationStatus.Expired;

            //AddDomainEvent(new ReservationExpiredDomainEvent(Id, Product.Id, Location.ToString(), ReferenceId, Quantity));
        }
    }

    #endregion
}

