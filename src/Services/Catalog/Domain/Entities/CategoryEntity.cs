#region using

using Catalog.Domain.Abstractions;
using SourceCommon.Constants;

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

    #region Ctors

    private CategoryEntity() { }

    #endregion

    #region Methods

    public static CategoryEntity Create(Guid id,
        string name,
        string desctiption,
        string slug,
        Guid? parentId = null,
        string createdBy = SystemConst.CreatedBySystem)
    {
        return new CategoryEntity()
        {
            Id = id,
            Name = name,
            Description = desctiption,
            Slug = slug,
            ParentId = parentId,
            CreatedBy = createdBy,
            LastModifiedBy = createdBy,
            CreatedOnUtc = DateTimeOffset.UtcNow,
            LastModifiedOnUtc = DateTimeOffset.UtcNow,
        };
    }

    public void Update(string name,
        string desciption,
        string slug,
        Guid? parentId = null,
        string modifiedBy = SystemConst.CreatedBySystem)
    {
        Name = name;
        Description = desciption;
        Slug = slug;
        ParentId = parentId;
        LastModifiedBy = modifiedBy;
        LastModifiedOnUtc = DateTimeOffset.UtcNow;
    }

    #endregion
}
