#region using

using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;

#endregion

namespace Infrastructure.Data.Configurations;

public class KeycloakUserConfiguration : IEntityTypeConfiguration<KeycloakUser>
{
    #region Methods

    public void Configure(EntityTypeBuilder<KeycloakUser> builder)
    {
        builder.ToTable("keycloak_user");

        builder.HasKey(x => x.Id).HasName("pk_keycloak");

        builder.Property(x => x.Id).HasColumnName("id");

        builder.Property(o => o.CreatedBy).HasColumnName("created_by")
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(o => o.LastModifiedBy).HasColumnName("last_modified_at_by")
            .HasMaxLength(255);

        builder.Property(o => o.CreatedAt).HasColumnName("created_at")
            .IsRequired();

        builder.Property(o => o.LastModifiedAt).HasColumnName("last_modified_at");

        // one-to-one with AccountProfile
        builder.HasOne(x => x.AccountProfile)
         .WithOne(ap => ap.KeycloakUser)
         .HasForeignKey<AccountProfile>(ap => ap.KeycloakUserNo)
         .HasConstraintName("fk_accountprofile_keycloak");

        // one-to-many backrefs
        builder.HasMany(x => x.Participations)
         .WithOne(ct => ct.Participation)
         .HasForeignKey(ct => ct.ParticipationId)
         .HasConstraintName("fk_chatthread_participation");

        builder.HasMany(x => x.ChatHistories)
         .WithOne(ch => ch.Sender)
         .HasForeignKey(ch => ch.SenderId)
         .HasConstraintName("fk_chathistory_sender");

    }

    #endregion
}