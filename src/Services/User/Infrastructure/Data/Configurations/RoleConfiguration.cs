#region using

using Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Infrastructure.Data.Configurations;

public sealed class RoleConfiguration : IEntityTypeConfiguration<Role>
{
    #region Methods

    public void Configure(EntityTypeBuilder<Role> builder)
    {
        builder.ToTable("roles");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id).HasColumnName("id");
        builder.Property(u => u.Name).HasColumnName("name").HasMaxLength(255);
        builder.Property(u => u.CreatedAt).HasColumnName("created_at");
        builder.Property(u => u.CreatedBy).HasColumnName("created_by").HasMaxLength(50);
        builder.Property(u => u.LastModifiedAt).HasColumnName("last_modified_at");
        builder.Property(u => u.LastModifiedBy).HasColumnName("last_modified_by").HasMaxLength(50);

        builder.HasIndex(u => u.Name).IsUnique(true);
    }

    #endregion
}