#region using

using Order.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

#endregion

namespace Order.Infrastructure.Data.Configurations;

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

        builder.Property(x => x.AttemptCount)
            .HasColumnName("attempt_count")
            .HasDefaultValue(0)
            .IsRequired();

        builder.Property(x => x.MaxAttempts)
            .HasColumnName("max_attempts")
            .HasDefaultValue(3)
            .IsRequired();

        builder.Property(x => x.NextAttemptOnUtc)
            .HasColumnName("next_attempt_on_utc");

        builder.HasIndex(x => new { x.EventType });
        builder.HasIndex(x => new { x.ReceivedOnUtc });
        builder.HasIndex(x => new { x.ProcessedOnUtc });
        builder.HasIndex(x => new { x.NextAttemptOnUtc, x.ProcessedOnUtc, x.AttemptCount });
        builder.HasIndex(x => new { x.ProcessedOnUtc, x.AttemptCount, x.MaxAttempts });

    }

    #endregion

}
