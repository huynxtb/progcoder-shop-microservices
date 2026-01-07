#region using

using Inventory.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

#endregion

namespace Inventory.Infrastructure.Data.Configurations;

public sealed class InboxMessageConfiguration : IEntityTypeConfiguration<InboxMessageEntity>
{
    #region Implementations

    public void Configure(EntityTypeBuilder<InboxMessageEntity> builder)
    {
        builder.ToTable("inbox_messages");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .HasColumnName("id");

        builder.Property(x => x.EventType)
            .HasColumnName("event_type")
            .IsRequired();

        builder.Property(x => x.Content)
            .HasColumnName("content")
            .IsRequired();

        builder.Property(x => x.ReceivedOnUtc)
            .HasColumnName("received_on_utc")
            .IsRequired();

        builder.Property(x => x.ProcessedOnUtc)
            .HasColumnName("processed_on_utc");

        builder.Property(x => x.LastErrorMessage)
            .HasColumnName("last_error_message");

        builder.HasIndex(x => new { x.ProcessedOnUtc });
    }

    #endregion

}
