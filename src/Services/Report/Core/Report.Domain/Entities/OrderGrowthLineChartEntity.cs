#region using

using Report.Domain.Abstractions;

#endregion

namespace Report.Domain.Entities;

public sealed class OrderGrowthLineChartEntity : Entity<Guid>
{
    #region Fields, Properties and Indexers

    public int Day { get; private set; }

    public double Value { get; private set; }

    public DateTime Date { get; private set; }

    #endregion

    #region Factories

    public static OrderGrowthLineChartEntity Create(
        int day,
        double value,
        DateTime date,
        string? performedBy = null)
    {
        if (day < 1 || day > 31)
            throw new ArgumentOutOfRangeException(nameof(day), "Day must be between 1 and 31.");

        if (value < 0)
            throw new ArgumentOutOfRangeException(nameof(value), "Value cannot be negative.");

        var entity = new OrderGrowthLineChartEntity
        {
            Id = Guid.NewGuid(),
            Day = day,
            Value = value,
            Date = date,
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
