#region using

using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;

#endregion
namespace Infrastructure.Data.Configurations;

public class ChatHistoryConfiguration : IEntityTypeConfiguration<ChatHistory>
{
    #region Methods

    public void Configure(EntityTypeBuilder<ChatHistory> builder)
    {
        builder.ToTable("chat_history");

        builder.HasKey(x => x.Id).HasName("pk_chat_history");

        builder.Property(x => x.Id).HasColumnName("id")
            .ValueGeneratedOnAdd();

        builder.Property(x => x.ChatThreadId).HasColumnName("chat_thread_id");

        builder.Property(x => x.SenderId).HasColumnName("sender_id");

        builder.Property(x => x.Message).HasColumnName("message");

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