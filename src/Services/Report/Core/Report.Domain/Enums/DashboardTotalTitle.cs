#region using

using System.ComponentModel;

#endregion

namespace Report.Domain.Enums;

public enum DashboardTotalTitle
{
    #region Fields, Properties and Indexers

    [Description("Total Orders")]
    TotalOrders,

    [Description("Total Users")]
    TotalUsers,

    [Description("Total Products")]
    TotalProducts,

    [Description("Total Revenue")]
    TotalRevenue

    #endregion
}
