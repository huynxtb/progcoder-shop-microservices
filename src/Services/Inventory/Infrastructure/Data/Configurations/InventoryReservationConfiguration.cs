#region using

using Inventory.Domain.Entities;
using Inventory.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

#endregion

namespace Inventory.Infrastructure.Data.Configurations;

public sealed class InventoryReservationConfiguration : IEntityTypeConfiguration<InventoryReservationEntity>
{
    #region Implementations

    public void Configure(EntityTypeBuilder<InventoryReservationEntity> builder)
    {
        builder.ToTable("inventory_reservations");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .HasColumnName("id");

        builder.Property(x => x.ReferenceId)
            .HasColumnName("reference_id")
            .IsRequired();

        builder.Property(x => x.Quantity)
            .HasColumnName("quantity")
            .IsRequired();

        builder.Property(x => x.ExpiresAt)
            .HasColumnName("expires_at");

        builder.Property(x => x.CreatedOnUtc)
            .HasColumnName("created_on_utc")
            .IsRequired();

        builder.Property(x => x.CreatedBy)
            .HasColumnName("created_by")
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(x => x.LastModifiedOnUtc)
            .HasColumnName("last_modified_on_utc");

        builder.Property(x => x.LastModifiedBy)
            .HasColumnName("last_modified_by")
            .HasMaxLength(50);

        builder.Property(x => x.Status)
            .HasColumnName("status")
            .IsRequired()
            .HasDefaultValue(ReservationStatus.Pending)
            .HasConversion(
                s => s.ToString(),
                dbStatus => (ReservationStatus)Enum.Parse(typeof(ReservationStatus), dbStatus));

        builder.ComplexProperty(
            o => o.Product, nameBuilder =>
            {
                nameBuilder.Property(n => n.Id)
                    .HasColumnName("product_id")
                    .HasMaxLength(50)
                    .IsRequired();
                nameBuilder.Property(n => n.Name)
                    .HasColumnName("product_name")
                    .HasMaxLength(50)
                    .IsRequired();
            });

        builder.ComplexProperty(
            o => o.Location, nameBuilder =>
            {
                nameBuilder.Property(n => n.Address)
                    .HasColumnName("location_address")
                    .HasMaxLength(255)
                    .IsRequired();
            });

        builder.HasIndex(x => new { x.ReferenceId });
        builder.HasIndex(x => new { x.Status, x.ExpiresAt });
    }

    #endregion

}
