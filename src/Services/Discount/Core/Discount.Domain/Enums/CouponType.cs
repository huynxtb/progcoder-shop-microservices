#region using

using System.ComponentModel;

#endregion

namespace Discount.Domain.Enums;

public enum CouponType
{
    [Description("Fixed")]
    Fixed = 1,

    [Description("Percentage")]
    Percentage = 2
}
