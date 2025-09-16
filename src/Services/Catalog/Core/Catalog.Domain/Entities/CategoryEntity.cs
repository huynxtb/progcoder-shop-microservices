#region using

using Catalog.Domain.Abstractions;
using Common.Constants;
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
