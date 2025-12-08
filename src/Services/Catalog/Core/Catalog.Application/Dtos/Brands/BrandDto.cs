#region using

using Catalog.Application.Dtos.Abstractions;

#endregion

namespace Catalog.Application.Dtos.Brands;

public class BrandDto : DtoId<Guid>
{
    #region Fields, Properties and Indexers

    public string? Name { get; set; }

    public string? Slug { get; set; }

    #endregion
}
