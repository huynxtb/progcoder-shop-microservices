#region using

using Catalog.Domain.Abstractions;

#endregion

namespace Catalog.Domain.Entities;

public sealed class BrandEntity : Entity<Guid>
{
    #region Fields, Properties and Indexers

    public string? Name { get; set; }

    public string? Slug { get; set; }

    #endregion

    #region Factories

    public static BrandEntity Create(Guid id,
        string name,
        string slug,
        string performedBy)
    {
        return new BrandEntity()
        {
            Id = id,
            Name = name,
            Slug = slug,
            CreatedBy = performedBy,
            LastModifiedBy = performedBy,
            CreatedOnUtc = DateTimeOffset.UtcNow,
            LastModifiedOnUtc = DateTimeOffset.UtcNow,
        };
    }

    #endregion

    #region Methods

    public void Update(string name,
        string slug,
        string performedBy)
    {
        Name = name;
        Slug = slug;
        LastModifiedBy = performedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
    }

    #endregion
}
