#region using

using Basket.Application.Dtos.Abstractions;

#endregion

namespace Basket.Application.Dtos.Categories;

public class CategoryTreeItemDto : DtoId<Guid>
{
    #region Fields, Properties and Indexers

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? Slug { get; set; }

    public Guid? ParentId { get; set; }

    public bool HasChildren => Children?.Count > 0;

    public List<CategoryTreeItemDto>? Children { get; set; }

    #endregion
}
