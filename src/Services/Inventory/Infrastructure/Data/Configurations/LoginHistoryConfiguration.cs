//#region using

//using Inventory.Domain.Entities;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Metadata.Builders;

//#endregion

//namespace Inventory.Infrastructure.Data.Configurations;

//public sealed class LoginHistoryConfiguration : IEntityTypeConfiguration<InventoryItemEntity>
//{
//    #region Implementations

//    public void Configure(EntityTypeBuilder<InventoryItemEntity> builder)
//    {
//        builder.ToTable("login_histories");

//        builder.HasKey(x => x.Id);

//        builder.Property(x => x.Id).HasColumnName("id");
//        builder.Property(x => x.UserId).HasColumnName("user_id").IsRequired();
//        builder.Property(x => x.IpAddress).HasColumnName("ip_address").IsRequired().HasMaxLength(45);
//        builder.Property(x => x.LoggedOnUtc).HasColumnName("logged_on_utc");
//        builder.Property(x => x.CreatedOnUtc).HasColumnName("created_on_utc").IsRequired();
//        builder.Property(x => x.CreatedBy).HasColumnName("created_by").HasMaxLength(50).IsRequired();
//        builder.Property(x => x.LastModifiedOnUtc).HasColumnName("last_modified_on_utc");
//        builder.Property(x => x.LastModifiedBy).HasColumnName("last_modified_by").HasMaxLength(50);

//        builder.HasIndex(x => new { x.UserId, x.LoggedOnUtc });
//    }

//    #endregion
//}
