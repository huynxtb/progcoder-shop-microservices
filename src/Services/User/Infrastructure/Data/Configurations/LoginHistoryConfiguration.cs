#region using

using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

#endregion

namespace Infrastructure.Data.Configurations;

public sealed class LoginHistoryConfiguration : IEntityTypeConfiguration<LoginHistory>
{
    #region Implementations

    public void Configure(EntityTypeBuilder<LoginHistory> builder)
    {
        builder.ToTable("login_histories");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .HasColumnName("id");
        builder.Property(x => x.UserId)
            .HasColumnName("user_id")
            .IsRequired();
        builder.Property(x => x.IpAddress)
            .HasColumnName("ip_address")
            .IsRequired()
            .HasMaxLength(45);
        builder.Property(x => x.CreatedAt)
            .HasColumnName("created_at")
            .IsRequired();
        builder.Property(x => x.CreatedBy)
            .HasColumnName("created_by")
            .HasMaxLength(50)
            .IsRequired();
        builder.Property(x => x.LastModifiedAt)
            .HasColumnName("last_modified_at");
        builder.Property(x => x.LastModifiedBy)
            .HasColumnName("last_modified_by")
            .HasMaxLength(50);

        builder.HasIndex(x => new { x.UserId, x.LoggedAt });
    }

    #endregion
}
