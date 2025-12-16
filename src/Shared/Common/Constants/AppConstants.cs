namespace Common.Constants;

public sealed class AppConstants
{
    #region Common

    public const int MaxAttempts = 3;

    #endregion

    #region Bucket

    public static class Bucket
    {
        public const string Products = "products";
    }

    #endregion

    #region Service

    public static class Service
    {
        public const string Basket = "basket";

        public const string Catalog = "catalog";

        public const string Communication = "communication";

        public const string Discount = "discount";

        public const string Inventory = "inventory";

        public const string Notification = "notification";

        public const string Order = "order";

        public const string Report = "report";

        public const string Search = "search";
    }

    #endregion

    #region File Content Type

    public static class FileContentType
    {
        public const string OctetStream = "application/octet-stream";
    }

    #endregion
}
