namespace Catalog.Application.Dtos.Categories;

public class UpdateCategoryDto
{
    #region Fields, Properties and Indexers

    public string? Name { get; set; }

    public string? Description { get; set; }

    public Guid? ParentId { get; set; }

    #endregion
}
