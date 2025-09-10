#region using

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Order.Domain.Entities;

#endregion

namespace Order.Infrastructure.Data.Configurations;

public sealed class OrderItemEntityConfiguration : IEntityTypeConfiguration<OrderItemEntity>
{
    #region Implementations

    public void Configure(EntityTypeBuilder<OrderItemEntity> builder)
    {
        builder.ToTable("order_items");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .HasColumnName("id");

        builder.Property(x => x.OrderId)
            .HasColumnName("order_id")
            .IsRequired();

        builder.Property(x => x.Quantity)
            .HasColumnName("quantity")
            .IsRequired();

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

        // Configure Product value object
        builder.ComplexProperty(
            oi => oi.Product, b =>
            {
                b.Property(p => p.Id)
                    .HasColumnName("product_id")
                    .IsRequired();

                b.Property(p => p.Name)
                    .HasColumnName("product_name")
                    .HasMaxLength(255)
                    .IsRequired();

                b.Property(p => p.ImageUrl)
                    .HasColumnName("product_image_url")
                    .HasMaxLength(500);

                b.Property(p => p.Price)
                    .HasColumnName("product_price")
                    .IsRequired();
            });
    }

    #endregion
}
