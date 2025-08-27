#region using

using Catalog.Application.Dtos.Categories;

#endregion

namespace Catalog.Application.Models.Responses;

public class GetTreeCategoriesResponse
{
    #region Ctors

    public GetTreeCategoriesResponse(List<CategoryTreeItemDto> items)
    {
        Items = items;
    }

    #endregion

    #region Fields, Properties and Indexers

    public List<CategoryTreeItemDto>? Items { get; set; }

    #endregion
}
