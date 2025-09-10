#region using

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Order.Domain.Entities;
using Order.Domain.Enums;

#endregion

namespace Order.Infrastructure.Data.Configurations;

public sealed class OrderEntityConfiguration : IEntityTypeConfiguration<OrderEntity>
{
    #region Implementations

    public void Configure(EntityTypeBuilder<OrderEntity> builder)
    {
        builder.ToTable("orders");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .HasColumnName("id");

        builder.Property(x => x.Status)
            .HasColumnName("status")
            .HasConversion<int>()
            .IsRequired();

        builder.Property(x => x.TotalPrice)
            .HasColumnName("total_price")
            .HasPrecision(18, 2);

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

        // Configure Customer value object
        builder.ComplexProperty(
            o => o.Customer, b =>
            {
                b.Property(c => c.PhoneNumber)
                    .HasColumnName("customer_phone_number")
                    .HasMaxLength(50)
                    .IsRequired();

                b.Property(c => c.Name)
                    .HasColumnName("customer_name")
                    .HasMaxLength(255)
                    .IsRequired();

                b.Property(c => c.Email)
                    .HasColumnName("customer_email")
                    .HasMaxLength(255)
                    .IsRequired();
            });

        // Configure OrderNo value object
        builder.ComplexProperty(
            o => o.OrderNo, b =>
            {
                b.Property(on => on.Value)
                    .HasColumnName("order_no")
                    .HasMaxLength(20)
                    .IsRequired();
            });

        // Configure ShippingAddress value object
        builder.ComplexProperty(
            o => o.ShippingAddress, b =>
            {
                b.Property(a => a.FirstName)
                    .HasColumnName("shipping_first_name")
                    .HasMaxLength(100)
                    .IsRequired();

                b.Property(a => a.LastName)
                    .HasColumnName("shipping_last_name")
                    .HasMaxLength(100)
                    .IsRequired();

                b.Property(a => a.EmailAddress)
                    .HasColumnName("shipping_email")
                    .HasMaxLength(255);

                b.Property(a => a.AddressLine)
                    .HasColumnName("shipping_address_line")
                    .HasMaxLength(500)
                    .IsRequired();

                b.Property(a => a.Country)
                    .HasColumnName("shipping_country")
                    .HasMaxLength(100)
                    .IsRequired();

                b.Property(a => a.State)
                    .HasColumnName("shipping_state")
                    .HasMaxLength(100)
                    .IsRequired();

                b.Property(a => a.ZipCode)
                    .HasColumnName("shipping_zip_code")
                    .HasMaxLength(20)
                    .IsRequired();
            });

        // Configure relationship with OrderItems
        builder.HasMany(o => o.OrderItems)
            .WithOne()
            .HasForeignKey(oi => oi.OrderId)
            .OnDelete(DeleteBehavior.Cascade);

        // Configure navigation property
        builder.Navigation(o => o.OrderItems)
            .UsePropertyAccessMode(PropertyAccessMode.Field);
    }

    #endregion
}