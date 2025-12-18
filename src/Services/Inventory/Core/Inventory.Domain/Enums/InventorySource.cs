#region using

using System.ComponentModel;

#endregion

namespace Inventory.Domain.Enums;

public enum InventorySource
{
    [Description("unknown")]
    Unknown = 0,

    [Description("order-service")]
    OrderService = 1,

    [Description("purchase-order")]
    PurchaseOrder = 2,

    [Description("manual-adjustment")]
    ManualAdjustment = 3,

    [Description("transfer")]
    Transfer = 4,

    [Description("return")]
    Return = 5,

    [Description("system")]
    System = 6,

    [Description("manual-delete")]
    ManualDelete = 7,

    [Description("merge")]
    Merge = 8,
}
