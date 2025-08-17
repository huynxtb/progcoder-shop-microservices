#region using

using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

#endregion

namespace User.Infrastructure.Data.Configurations;

public sealed class UserConfiguration : IEntityTypeConfiguration<Domain.Entities.User>
{
    #region Implementations

    public void Configure(EntityTypeBuilder<Domain.Entities.User> builder)
    {
        builder.ToTable("users");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id).HasColumnName("id");
        builder.Property(x => x.UserName).HasColumnName("user_name").HasMaxLength(255);
        builder.Property(x => x.Email).HasColumnName("email").HasMaxLength(255);
        builder.Property(x => x.FirstName).HasColumnName("first_name").HasMaxLength(100);
        builder.Property(x => x.LastName).HasColumnName("last_name").HasMaxLength(100);
        builder.Property(x => x.EmailVerified).HasColumnName("email_verified").HasDefaultValue(false);
        builder.Property(x => x.IsActive).HasColumnName("is_active").HasDefaultValue(true);;
        builder.Property(x => x.CreatedOnUtc).HasColumnName("created_on_utc");
        builder.Property(x => x.CreatedBy).HasColumnName("created_by").HasMaxLength(50);
        builder.Property(x => x.LastModifiedOnUtc).HasColumnName("last_modified_on_utc");
        builder.Property(x => x.LastModifiedBy).HasColumnName("last_modified_by").HasMaxLength(50);

        builder.HasIndex(x => x.UserName).IsUnique(true);
        builder.HasIndex(x => x.Email).IsUnique(true);

        builder.HasMany(x => x.LoginHistories)
         .WithOne(x => x.User)
         .HasForeignKey(x => x.UserId)
         .IsRequired()
         .OnDelete(DeleteBehavior.Cascade);
    }

    #endregion
}