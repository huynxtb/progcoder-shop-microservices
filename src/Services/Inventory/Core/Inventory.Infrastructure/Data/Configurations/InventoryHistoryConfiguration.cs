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

        builder.Property(x => x.Message)
            .HasColumnName("message");

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

        //builder.HasIndex(x => x.CreatedOnUtc);
    }

    #endregion
}