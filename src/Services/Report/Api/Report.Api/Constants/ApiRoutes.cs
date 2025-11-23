namespace Report.Api.Constants;

public sealed class ApiRoutes
{
    public static class DashboardTotal
    {
        #region Constants

        public const string Tags = "Dashboard Totals";

        private const string Base = "/dashboard-totals";

        public const string GetDashboardTotals = Base;

        #endregion
    }

    public static class OrderGrowthLineChart
    {
        #region Constants

        public const string Tags = "Order Growth Line Chart";

        private const string Base = "/order-growth-line-chart";

        public const string GetOrderGrowthLineChart = Base;

        #endregion
    }

    public static class TopProductPieChart
    {
        #region Constants

        public const string Tags = "Top Product Pie Chart";

        private const string Base = "/top-product-pie-chart";

        public const string GetTopProductPieChart = Base;

        #endregion
    }
}
