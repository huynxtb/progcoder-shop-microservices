namespace Inventory.Domain.Enums;

public enum InventorySource
{
    Unknown = 0,
    OrderService = 1,
    PurchaseOrder = 2,
    ManualAdjustment = 3,
    Transfer = 4,
    Return = 5,
    System = 6
}
