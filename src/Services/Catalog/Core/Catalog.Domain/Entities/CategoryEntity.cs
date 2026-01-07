#region using

using Catalog.Domain.Abstractions;

#endregion

namespace Catalog.Domain.Entities;

public sealed class CategoryEntity : Entity<Guid>
{
    #region Fields, Properties and Indexers

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? Slug { get; set; }

    public Guid? ParentId { get; set; }

    #endregion

    #region Factories

    public static CategoryEntity Create(Guid id,
        string name,
        string desctiption,
        string slug,
        string performedBy,
        Guid? parentId = null)
    {
        return new CategoryEntity()
        {
            Id = id,
            Name = name,
            Description = desctiption,
            Slug = slug,
            ParentId = parentId,
            CreatedBy = performedBy,
            LastModifiedBy = performedBy,
            CreatedOnUtc = DateTimeOffset.UtcNow,
            LastModifiedOnUtc = DateTimeOffset.UtcNow,
        };
    }

    #endregion

    #region Methods

    public void Update(string name,
        string desciption,
        string slug,
        string performedBy,
        Guid? parentId = null)
    {
        Name = name;
        Description = desciption;
        Slug = slug;
        ParentId = parentId;
        LastModifiedBy = performedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
    }

    #endregion
}
