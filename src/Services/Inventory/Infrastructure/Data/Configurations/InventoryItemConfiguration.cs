#region using

using Inventory.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Mysqlx.Crud;

#endregion

namespace Inventory.Infrastructure.Data.Configurations;

public sealed class InventoryItemConfiguration : IEntityTypeConfiguration<InventoryItemEntity>
{
    #region Implementations

    public void Configure(EntityTypeBuilder<InventoryItemEntity> builder)
    {
        builder.ToTable("inventory_items");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .HasColumnName("id");

        builder.Property(x => x.Quantity)
            .HasColumnName("quantity")
            .IsRequired();

        builder.Property(x => x.Reserved)
            .HasColumnName("reserved");

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

        builder.ComplexProperty(
            o => o.Product, b =>
            {
                b.Property(n => n.Id)
                    .HasColumnName("product_id")
                    .HasMaxLength(50)
                    .IsRequired();

                b.Property(n => n.Name)
                    .HasColumnName("product_name")
                    .HasMaxLength(255)
                    .IsRequired();
            });

        builder.ComplexProperty(
            o => o.Location, b =>
            {
                b.Property(n => n.Address)
                    .HasColumnName("location_address")
                    .HasMaxLength(255)
                    .IsRequired();
            });
    }

    #endregion
}
