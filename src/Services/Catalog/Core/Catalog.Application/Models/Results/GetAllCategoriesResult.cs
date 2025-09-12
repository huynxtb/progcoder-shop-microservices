#region using

using Catalog.Application.Dtos.Categories;

#endregion

namespace Catalog.Application.Models.Results;

public sealed class GetAllCategoriesResult
{
    #region Fields, Properties and Indexers

    public List<CategoryDto> Items { get; init; }

    #endregion

    #region Ctors

    public GetAllCategoriesResult(List<CategoryDto> items)
    {
        Items = items;
    }

    #endregion
}
