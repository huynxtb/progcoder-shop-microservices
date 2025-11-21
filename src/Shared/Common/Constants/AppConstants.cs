namespace Common.Constants;

public sealed class AppConstants
{
    #region Fields, Properties and Indexers

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
        public const string Catalog = "catalog";

        public const string Notification = "notification";

        public const string Inventory = "inventory";
    }

    #endregion

    #region File Content Type

    public static class FileContentType
    {
        public const string OctetStream = "application/octet-stream";
    }

    #endregion
}
