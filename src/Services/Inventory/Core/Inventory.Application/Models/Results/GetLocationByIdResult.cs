#region using

using Inventory.Application.Dtos.InventoryItems;

#endregion

namespace Inventory.Application.Models.Results;

public sealed class GetLocationByIdResult
{
    #region Fields, Properties and Indexers

    public LocationDto Location { get; init; }

    #endregion

    #region Ctors

    public GetLocationByIdResult(LocationDto location)
    {
        Location = location;
    }

    #endregion
}

