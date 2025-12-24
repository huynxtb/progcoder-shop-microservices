#region using

using Inventory.Application.Dtos.InventoryReservations;

#endregion

namespace Inventory.Application.Models.Results;

public sealed class GetAllInventoryReservationResult
{
    #region Fields, Properties and Indexers

    public List<ReservationDto> Items { get; init; }

    #endregion

    #region Ctors

    public GetAllInventoryReservationResult(List<ReservationDto> items)
    {
        Items = items;
    }

    #endregion
}

