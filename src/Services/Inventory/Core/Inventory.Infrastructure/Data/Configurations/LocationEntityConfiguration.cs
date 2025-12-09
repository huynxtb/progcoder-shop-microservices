#region using

using Inventory.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

#endregion

namespace Inventory.Infrastructure.Data.Configurations;

public sealed class LocationEntityConfiguration : IEntityTypeConfiguration<LocationEntity>
{
    #region Implementations

    public void Configure(EntityTypeBuilder<LocationEntity> builder)
    {
        builder.ToTable("locations");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .HasColumnName("id")
            .IsRequired();

        builder.Property(x => x.Location)
            .HasColumnName("location")
            .HasMaxLength(255)
            .IsRequired();
    }

    #endregion
}

