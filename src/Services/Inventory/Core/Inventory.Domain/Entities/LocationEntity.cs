#region using

using Inventory.Domain.Abstractions;

#endregion

namespace Inventory.Domain.Entities;

public class LocationEntity : Entity<Guid>
{
    #region Fields, Properties and Indexers

    public string? Location { get; set; }

    #endregion

    #region Factories

    public static LocationEntity Create(Guid id, string location, string performBy)
    {
        if (string.IsNullOrWhiteSpace(location)) throw new ArgumentNullException(nameof(location));

        var entity = new LocationEntity
        {
            Id = id,
            Location = location,
            CreatedBy = performBy,
            CreatedOnUtc = DateTimeOffset.UtcNow,
            LastModifiedBy = performBy,
            LastModifiedOnUtc = DateTimeOffset.UtcNow
        };

        return entity;
    }

    #endregion

    #region Methods

    public void Update(string location, string performBy)
    {
        if (string.IsNullOrWhiteSpace(location)) throw new ArgumentNullException(nameof(location));

        Location = location;
        LastModifiedBy = performBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
    }

    #endregion
}
