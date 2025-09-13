#region using

using Basket.Application.Dtos.Categories;

#endregion

namespace Basket.Application.Models.Results;

public sealed class GetTreeCategoriesResult
{
    #region Fields, Properties and Indexers

    public List<CategoryTreeItemDto>? Items { get; init; }

    #endregion

    #region Ctors

    public GetTreeCategoriesResult(List<CategoryTreeItemDto> items)
    {
        Items = items;
    }

    #endregion
}
