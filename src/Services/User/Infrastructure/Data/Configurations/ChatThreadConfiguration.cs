#region using

using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;

#endregion
namespace Infrastructure.Data.Configurations;

public class ChatThreadConfiguration : IEntityTypeConfiguration<ChatThread>
{
    #region Methods

    public void Configure(EntityTypeBuilder<ChatThread> builder)
    {
        builder.ToTable("chat_thread");

        builder.HasKey(x => x.Id).HasName("pk_chat_thread");

        builder.Property(x => x.Id).HasColumnName("id")
            .ValueGeneratedOnAdd();

        builder.Property(x => x.AgentId).HasColumnName("agent_id");

        builder.Property(x => x.ParticipationId).HasColumnName("participation_id");

        builder.Property(o => o.CreatedBy).HasColumnName("created_by")
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(o => o.LastModifiedBy).HasColumnName("last_modified_at_by")
            .HasMaxLength(255);

        builder.Property(o => o.CreatedAt).HasColumnName("created_at")
            .IsRequired();

        builder.Property(o => o.LastModifiedAt).HasColumnName("last_modified_at");

        builder.HasMany(x => x.ChatHistories)
         .WithOne(ch => ch.ChatThread)
         .HasForeignKey(ch => ch.ChatThreadId)
         .HasConstraintName("fk_chathistory_thread");

    }

    #endregion
}