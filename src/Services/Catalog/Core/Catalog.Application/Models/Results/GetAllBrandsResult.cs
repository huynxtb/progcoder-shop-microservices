#region using

using Catalog.Application.Dtos.Brands;

#endregion

namespace Catalog.Application.Models.Results;

public sealed class GetAllBrandsResult
{
    #region Fields, Properties and Indexers

    public List<BrandDto> Items { get; init; }

    #endregion

    #region Ctors

    public GetAllBrandsResult(List<BrandDto> items)
    {
        Items = items;
    }

    #endregion
}
