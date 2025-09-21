#region using

using Order.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

#endregion

namespace Order.Infrastructure.Data.Configurations;

public sealed class OutboxMessageConfiguration : IEntityTypeConfiguration<OutboxMessageEntity>
{
    #region Implementations

    public void Configure(EntityTypeBuilder<OutboxMessageEntity> builder)
    {
        builder.ToTable("outbox_messages");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .HasColumnName("id");

        builder.Property(x => x.EventType)
            .HasColumnName("event_type")
            .IsRequired();

        builder.Property(x => x.Content)
            .HasColumnName("content")
            .IsRequired();

        builder.Property(x => x.OccurredOnUtc)
            .HasColumnName("occurred_on_utc")
            .IsRequired();

        builder.Property(x => x.ProcessedOnUtc)
            .HasColumnName("processed_on_utc");

        builder.Property(x => x.LastErrorMessage)
            .HasColumnName("last_error_message");

        builder.Property(x => x.ClaimedOnUtc)
            .HasColumnName("claimed_on_utc");

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
        builder.HasIndex(x => new { x.OccurredOnUtc });
        builder.HasIndex(x => new { x.ProcessedOnUtc });
        builder.HasIndex(x => new { x.ClaimedOnUtc });
        builder.HasIndex(x => new { x.ProcessedOnUtc, x.ClaimedOnUtc });
        builder.HasIndex(x => new { x.NextAttemptOnUtc, x.ProcessedOnUtc, x.AttemptCount });
        builder.HasIndex(x => new { x.ProcessedOnUtc, x.AttemptCount, x.MaxAttempts });

    }

    #endregion

}