#region using

using Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

#endregion

namespace Infrastructure.Data.Configurations;

public class AgentConfiguration : IEntityTypeConfiguration<Agent>
{
    #region Methods

    public void Configure(EntityTypeBuilder<Agent> builder)
    {
        builder.ToTable("agent");

        builder.HasKey(x => x.Id).HasName("pk_agent");

        builder.Property(x => x.Id).HasColumnName("id");

        builder.Property(x => x.OwnerId).HasColumnName("owner_id");

        builder.Property(x => x.Name).HasColumnName("name")
            .HasMaxLength(255)
            .IsRequired();

        builder.Property(x => x.Description).HasColumnName("description")
            .HasMaxLength(1000)
            .IsRequired();

        builder.Property(x => x.Instruction).HasColumnName("instruction")
            .HasMaxLength(255)
            .IsRequired();

        builder.Property(x => x.AvatarUrl).HasColumnName("avatar_url")
            .HasMaxLength(255)
            .IsRequired();

        builder.Property(o => o.CreatedBy).HasColumnName("created_by")
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(o => o.LastModifiedBy).HasColumnName("last_modified_at_by")
            .HasMaxLength(255);

        builder.Property(o => o.CreatedAt).HasColumnName("created_at")
            .IsRequired();

        builder.Property(o => o.LastModifiedAt).HasColumnName("last_modified_at");

        builder.HasOne(x => x.Owner)
         .WithMany(ap => ap.Agents)
         .HasForeignKey(x => x.OwnerId)
         .HasConstraintName("fk_agent_owner");

        builder.HasMany(x => x.ChatThreads)
         .WithOne(ct => ct.Agent)
         .HasForeignKey(ct => ct.AgentId)
         .HasConstraintName("fk_chatthread_agent");

    }

    #endregion
}