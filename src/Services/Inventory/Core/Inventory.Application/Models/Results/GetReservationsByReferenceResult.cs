#region using

using Inventory.Application.Dtos.InventoryReservations;

#endregion

namespace Inventory.Application.Models.Results;

public sealed class GetReservationsByReferenceResult
{
    #region Fields, Properties and Indexers

    public List<ReservationDto> Items { get; init; }

    #endregion

    #region Ctors

    public GetReservationsByReferenceResult(List<ReservationDto> items)
    {
        Items = items;
    }

    #endregion
}

