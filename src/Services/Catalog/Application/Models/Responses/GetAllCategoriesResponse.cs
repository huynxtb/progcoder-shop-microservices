#region using

using Catalog.Application.Dtos.Categories;

#endregion

namespace Catalog.Application.Models.Responses;

public class GetAllCategoriesResponse
{
    #region Ctors

    public GetAllCategoriesResponse(List<CategoryDto> items)
    {
        Items = items;
    }

    #endregion

    #region Fields, Properties and Indexers

    public List<CategoryDto>? Items { get; set; }

    #endregion
}
