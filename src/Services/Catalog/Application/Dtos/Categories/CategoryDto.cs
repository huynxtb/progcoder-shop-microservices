#region using

using Catalog.Application.Dtos.Abstractions;

#endregion

namespace Catalog.Application.Dtos.Categories;

public class CategoryDto : DtoId<Guid>
{
    #region Fields, Properties and Indexers

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? Slug { get; set; }

    public Guid? ParentId { get; set; }

    #endregion
}
