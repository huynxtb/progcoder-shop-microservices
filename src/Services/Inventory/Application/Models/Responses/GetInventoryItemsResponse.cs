#region using

using Inventory.Application.Dtos.InventoryItems;
using Common.Models.Reponses;

#endregion

namespace Inventory.Application.Models.Responses;

public sealed class GetInventoryItemsResponse
{
    #region Fields, Properties and Indexers

    public List<InventoryItemDto> Items { get; set; } = new();

    public PaginationResponse Paging { get; set; } = new();

    #endregion

    #region Ctors

    public GetInventoryItemsResponse(List<InventoryItemDto> items, PaginationResponse paging)
    {
        Items = items;
        Paging = paging;
    }

    #endregion
}
