#region using

using System.ComponentModel;

#endregion

namespace Discount.Domain.Enums;

public enum CouponStatus
{
    [Description("Pending")]
    Pending = 1,

    [Description("Approved")]
    Approved = 2,

    [Description("Expired")]
    Expired = 3,

    [Description("Out of Stock")]
    OutOfStock = 4,

    [Description("Rejected")]
    Rejected = 5
}
