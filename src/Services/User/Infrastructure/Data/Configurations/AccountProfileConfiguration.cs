#region using

using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;

#endregion

namespace Infrastructure.Data.Configurations;

public class AccountProfileConfiguration : IEntityTypeConfiguration<AccountProfile>
{
    #region Methods

    public void Configure(EntityTypeBuilder<AccountProfile> builder)
    {
        builder.ToTable("account_profile");

        builder.HasKey(x => x.Id).HasName("pk_account_profile");

        builder.Property(x => x.Id).HasColumnName("id")
            .ValueGeneratedOnAdd();

        builder.Property(x => x.KeycloakUserNo).HasColumnName("keycloak_user_no");

        builder.Property(x => x.Bio).HasColumnName("bio")
            .HasMaxLength(255);

        builder.Property(x => x.Birthday).HasColumnName("birthday");

        builder.Property(o => o.CreatedBy).HasColumnName("created_by")
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(o => o.LastModifiedBy).HasColumnName("last_modified_at_by")
            .HasMaxLength(255);

        builder.Property(o => o.CreatedAt).HasColumnName("created_at")
            .IsRequired();

        builder.Property(o => o.LastModifiedAt).HasColumnName("last_modified_at");

        builder.HasMany(x => x.Agents)
         .WithOne(a => a.Owner)
         .HasForeignKey(a => a.OwnerId);

        builder.HasMany(x => x.Subscriptions)
         .WithOne(asub => asub.AccountProfile)
         .HasForeignKey(asub => asub.AccountId);

    }

    #endregion
}