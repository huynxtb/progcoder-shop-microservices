namespace Inventory.Application.Dtos.InventoryItems;

public class CreateInventoryItemDto
{
    #region Fields, Properties and Indexers

    public Guid ProductId { get; set; }

    public int Quantity { get; set; }

    public Guid LocationId { get; set; }

    #endregion
}
