#region using

using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;

#endregion
namespace Infrastructure.Data.Configurations;

public class CouponConfiguration : IEntityTypeConfiguration<Coupon>
{
    #region Methods

    public void Configure(EntityTypeBuilder<Coupon> builder)
    {
        builder.ToTable("coupon");

        builder.HasKey(x => x.Id).HasName("pk_coupon");

        builder.Property(x => x.Id).HasColumnName("id");

        builder.Property(x => x.Code).HasColumnName("code")
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.Detail).HasColumnName("detail")
            .HasMaxLength(1000)
            .IsRequired();

        builder.Property(x => x.Discount).HasColumnName("discount");

        builder.Property(x => x.LimitDiscountAmount).HasColumnName("limit_discount_amount");

        builder.Property(x => x.ExpiredDatetime).HasColumnName("expired_datetime");

        builder.Property(o => o.CreatedBy).HasColumnName("created_by")
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(o => o.LastModifiedBy).HasColumnName("last_modified_at_by")
            .HasMaxLength(255);

        builder.Property(o => o.CreatedAt).HasColumnName("created_at")
            .IsRequired();

        builder.Property(o => o.LastModifiedAt).HasColumnName("last_modified_at");

    }

    #endregion
}