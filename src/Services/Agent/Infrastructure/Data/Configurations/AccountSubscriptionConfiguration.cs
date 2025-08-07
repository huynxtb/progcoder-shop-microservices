#region using

using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;

#endregion
namespace Infrastructure.Data.Configurations;

public class AccountSubscriptionConfiguration : IEntityTypeConfiguration<AccountSubscription>
{
    #region Methods

    public void Configure(EntityTypeBuilder<AccountSubscription> builder)
    {
        builder.ToTable("account_subscription");

        builder.HasKey(x => x.Id).HasName("pk_account_subscription");

        builder.Property(x => x.Id).HasColumnName("id");

        builder.Property(x => x.AccountId).HasColumnName("account_id");

        builder.Property(x => x.SubscriptionId).HasColumnName("subscription_id");

        builder.Property(x => x.ExpiredDatetime).HasColumnName("expired_datetime");

        builder.Property(x => x.Token).HasColumnName("token")
            .IsRequired();

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