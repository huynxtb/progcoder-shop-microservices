namespace Report.Api.Constants;

public sealed class ApiRoutes
{
    public static class ReportStatistics
    {
        #region Constants

        public const string Tags = "Report Statistics";

        public const string GetDashboardStatistics = "/admin/dashboard-statistics";

        public const string GetOrderGrowthStatistics = "/admin/order-growth-statistics";

        public const string GetTopProductStatistics = "/admin/top-product-statistics";

        #endregion
    }
}
