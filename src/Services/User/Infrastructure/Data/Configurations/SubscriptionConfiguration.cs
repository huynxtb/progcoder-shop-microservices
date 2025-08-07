#region using

using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;

#endregion

namespace Infrastructure.Data.Configurations;

public class SubscriptionConfiguration : IEntityTypeConfiguration<Subscription>
{
    #region Methods

    public void Configure(EntityTypeBuilder<Subscription> builder)
    {
        builder.ToTable("subscription");

        builder.HasKey(x => x.Id).HasName("pk_subscription");

        builder.Property(x => x.Id).HasColumnName("id")
            .ValueGeneratedOnAdd();

        builder.Property(x => x.Name).HasColumnName("name")
            .HasMaxLength(255)
            .IsRequired();

        builder.Property(x => x.Detail).HasColumnName("detail")
            .HasMaxLength(1000)
            .IsRequired();

        builder.Property(o => o.CreatedBy).HasColumnName("created_by")
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(o => o.LastModifiedBy).HasColumnName("last_modified_at_by")
            .HasMaxLength(255);

        builder.Property(o => o.CreatedAt).HasColumnName("created_at")
            .IsRequired();

        builder.Property(o => o.LastModifiedAt).HasColumnName("last_modified_at");

        builder.HasMany(x => x.AccountSubscriptions)
         .WithOne(asub => asub.Subscription)
         .HasForeignKey(asub => asub.SubscriptionId);

    }

    #endregion
}