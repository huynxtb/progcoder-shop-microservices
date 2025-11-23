#region using

using Report.Domain.Abstractions;

#endregion

namespace Report.Domain.Entities;

public sealed class TopProductPieChartEntity : Entity<Guid>
{
    #region Fields, Properties and Indexers

    public string Name { get; private set; } = default!;

    public double Value { get; private set; }

    #endregion

    #region Factories

    public static TopProductPieChartEntity Create(
        string name,
        double value,
        string? performedBy = null)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Name cannot be null or empty.", nameof(name));

        if (value < 0)
            throw new ArgumentOutOfRangeException(nameof(value), "Value cannot be negative.");

        var entity = new TopProductPieChartEntity
        {
            Id = Guid.NewGuid(),
            Name = name,
            Value = value,
            CreatedBy = performedBy,
            LastModifiedBy = performedBy,
            CreatedOnUtc = DateTimeOffset.UtcNow,
            LastModifiedOnUtc = DateTimeOffset.UtcNow
        };

        return entity;
    }

    #endregion

    #region Methods

    public void UpdateValue(double value, string performedBy)
    {
        if (value < 0)
            throw new ArgumentOutOfRangeException(nameof(value), "Value cannot be negative.");

        Value = value;
        LastModifiedBy = performedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
    }

    #endregion
}
