#region using

using System.ComponentModel;

#endregion

namespace App.Job.Enums;

public enum DashboardTotalTitle
{
    [Description("Total Revenue")]
    TotalRevenue,

    [Description("Total Users")]
    TotalUsers,

    [Description("Products Sold")]
    ProductsSold,

    [Description("Growth")]
    Growth
}
