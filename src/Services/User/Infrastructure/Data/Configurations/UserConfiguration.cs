#region using

using Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Infrastructure.Data.Configurations;

public sealed class UserConfiguration : IEntityTypeConfiguration<User>
{
    #region Methods

    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("users");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id).HasColumnName("id");
        builder.Property(u => u.UserName).HasColumnName("user_name").HasMaxLength(255);
        builder.Property(u => u.Email).HasColumnName("email").HasMaxLength(255);
        builder.Property(u => u.FirstName).HasColumnName("first_name").HasMaxLength(100);
        builder.Property(u => u.LastName).HasColumnName("last_name").HasMaxLength(100);
        builder.Property(u => u.KeycloakUserId).HasColumnName("keycloak_user_id").HasMaxLength(50);
        builder.Property(u => u.CreatedAt).HasColumnName("created_at");
        builder.Property(u => u.CreatedBy).HasColumnName("created_by").HasMaxLength(50);
        builder.Property(u => u.LastModifiedAt).HasColumnName("last_modified_at");
        builder.Property(u => u.LastModifiedBy).HasColumnName("last_modified_by").HasMaxLength(50);

        builder.HasIndex(u => u.UserName).IsUnique(true);
        builder.HasIndex(u => u.Email).IsUnique(true);
    }

    #endregion
}