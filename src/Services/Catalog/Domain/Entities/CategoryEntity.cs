#region using

using Catalog.Domain.Abstractions;
using SourceCommon.Constants;
using System.Text.Json.Serialization;

#endregion

namespace Catalog.Domain.Entities;

public sealed class CategoryEntity : Entity<Guid>
{
    #region Fields, Properties and Indexers

    [JsonInclude]
    public string? Name { get; private set; }

    [JsonInclude]
    public string? Description { get; private set; }

    [JsonInclude]
    public string? Slug { get; private set; }

    [JsonInclude]
    public Guid? ParentId { get; private set; }

    #endregion

    #region Ctors

    [JsonConstructor]
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
