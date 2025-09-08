#region using

using Inventory.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

#endregion

namespace Inventory.Infrastructure.Data.Configurations;

public sealed class InventoryHistoryConfiguration : IEntityTypeConfiguration<InventoryHistoryEntity>
{
    #region Implementations

    public void Configure(EntityTypeBuilder<InventoryHistoryEntity> builder)
    {
        builder.ToTable("inventory_histories");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .HasColumnName("id");

        builder.Property(x => x.InventoryItemId)
            .HasColumnName("inventory_item_id")
            .IsRequired();

        builder.Property(x => x.ChangedAt)
            .HasColumnName("changed_at")
            .IsRequired();

        builder.Property(x => x.ChangeAmount)
            .HasColumnName("change_amount")
            .IsRequired();

        builder.Property(x => x.QuantityAfterChange)
            .HasColumnName("quantity_after_change")
            .IsRequired();

        builder.Property(x => x.Source)
            .HasColumnName("source")
            .HasMaxLength(255)
            .IsRequired();

        builder.HasIndex(x => new { x.InventoryItemId, x.ChangedAt });
    }

    #endregion
}