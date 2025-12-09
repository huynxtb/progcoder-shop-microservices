#region using

using Inventory.Application.Dtos.InventoryItems;

#endregion

namespace Inventory.Application.Models.Results;

public sealed class GetAllLocationsResult
{
    #region Fields, Properties and Indexers

    public List<LocationDto> Items { get; init; }

    #endregion

    #region Ctors

    public GetAllLocationsResult(List<LocationDto> items)
    {
        Items = items;
    }

    #endregion
}

