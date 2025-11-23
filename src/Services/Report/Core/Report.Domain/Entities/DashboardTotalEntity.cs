#region using

using Report.Domain.Abstractions;

#endregion

namespace Report.Domain.Entities;

public sealed class DashboardTotalEntity : Entity<Guid>
{
    #region Fields Properties and Indexers

    public string? Bg { get; private set; }

    public string? Text { get; private set; }

    public string? Icon { get; private set; }

    public string? Title { get; private set; }

    public string? Count { get; private set; }

    #endregion

    #region Factories

    public static DashboardTotalEntity Create(
        string title,
        string count,
        string? bg = null,
        string? text = null,
        string? icon = null,
        string? performedBy = null)
    {
        if (string.IsNullOrWhiteSpace(title))
            throw new ArgumentException("Title cannot be null or empty.", nameof(title));

        if (string.IsNullOrWhiteSpace(count))
            throw new ArgumentException("Count cannot be null or empty.", nameof(count));

        var entity = new DashboardTotalEntity
        {
            Id = Guid.NewGuid(),
            Title = title,
            Count = count,
            Bg = bg,
            Text = text,
            Icon = icon,
            CreatedBy = performedBy,
            LastModifiedBy = performedBy,
            CreatedOnUtc = DateTimeOffset.UtcNow,
            LastModifiedOnUtc = DateTimeOffset.UtcNow
        };

        return entity;
    }

    #endregion

    #region Methods

    public void UpdateCount(string count, string performedBy)
    {
        if (string.IsNullOrWhiteSpace(count))
            throw new ArgumentException("Count cannot be null or empty.", nameof(count));

        Count = count;
        LastModifiedBy = performedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
    }

    public void UpdateDisplay(string? bg, string? text, string? icon, string performedBy)
    {
        Bg = bg;
        Text = text;
        Icon = icon;
        LastModifiedBy = performedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
    }

    #endregion
}
